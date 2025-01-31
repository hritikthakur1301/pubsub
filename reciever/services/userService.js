import user from '../models/user.js';
import { v4 as uuidv4 } from 'uuid';

export const createUser = async (userData) => {
  return await user.create({ id: uuidv4(), ...userData });
};
