import { createUser } from '../services/userService.js';
import { publishUserEvent } from '../services/sqsService.js';
import { MESSAGE_CONSTANT } from '../common/constant.js';

export async function addUser(req, res) {
  try {
    const { user: username, class: userClass, age, email } = req.body;
    const newUser = await createUser({
      username,
      class: userClass,
      age,
      email,
    });
    await publishUserEvent(newUser);
    res.status(201).json({ message: MESSAGE_CONSTANT.USER_CREATED });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.errors });
  }
}
