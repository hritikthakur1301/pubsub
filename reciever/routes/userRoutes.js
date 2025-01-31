import { Router } from 'express';
import validateUser from '../validator/userValidation.js'
const router = Router();
import { addUser } from '../controllers/userController.js';

router.post('/receiver', validateUser, addUser);

export default router;
