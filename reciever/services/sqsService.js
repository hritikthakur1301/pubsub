import aws from 'aws-sdk';

const sqs = new aws.SQS({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const publishUserEvent = async (user) => {
  try {
    const params = {
      MessageBody: JSON.stringify({
        id: user.id,
        inserted_at: user.inserted_at,
        userClass: user.class,
        age: user.age,
        email: user.email,
        username: user.username,
      }),
      QueueUrl: process.env.SQS_QUEUE_URL,
      MessageGroupId: 'user-creation-group',
      MessageDeduplicationId: user.id,
    };
    await sqs.sendMessage(params).promise();
  } catch (error) {
    console.error('erron in publish', error);
  }
};
