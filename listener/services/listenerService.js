import {
  DeleteMessageCommand,
  ReceiveMessageCommand,
  SQSClient,
} from '@aws-sdk/client-sqs';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

const SQS_CONFIG = {
  region: process.env.AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

const sqs = new SQSClient(SQS_CONFIG);
const queueUrl = process.env.SQS_QUEUE_URL;

const receiveMessages = async () => {
  try {
    const params = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 1,
      WaitTimeSeconds: 10,
    };
    return await sqs.send(new ReceiveMessageCommand(params));
  } catch (error) {
    console.error(error);
    return null;
  }
};

const processMessage = async (message) => {
  try {
    const { id, username, age, userClass, email, inserted_at } = JSON.parse(
      message.Body
    );
    const modified_at = new Date().toISOString();
    await pool.query(
      'INSERT INTO User_Events (id, username, class, age, email, inserted_at, modified_at, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [
        id,
        username,
        userClass,
        age,
        email,
        inserted_at,
        modified_at,
        new Date(),
        new Date(),
      ]
    );
    await deleteMessageFromQueue(message.ReceiptHandle);
    console.log(`processed`);
  } catch (error) {
    console.error("error in processed",error);
  }
};

const deleteMessageFromQueue = async (receiptHandle) => {
  try {
    await sqs.send(
      new DeleteMessageCommand({
        QueueUrl: queueUrl,
        ReceiptHandle: receiptHandle,
      })
    );
  } catch (error) {
    console.error('Error in delete', error);
  }
};

export const processMessages = async () => {
  const data = await receiveMessages();
  if (data?.Messages) {
    for (const message of data.Messages) {
      await processMessage(message);
    }
  }
};
