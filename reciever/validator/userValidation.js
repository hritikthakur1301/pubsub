import { body, validationResult } from 'express-validator';
import { ADD_USER, VALIDATION_ERROR } from '../common/constant.js';

const validateUser = [
  body(ADD_USER.USER)
    .isString()
    .withMessage(VALIDATION_ERROR.USER_TYPE)
    .notEmpty()
    .withMessage(VALIDATION_ERROR.USER_REQUIRED),

  body(ADD_USER.CLASS)
    .isString()
    .withMessage(VALIDATION_ERROR.CLASS_TYPE)
    .notEmpty()
    .withMessage(VALIDATION_ERROR.CLASS_REQUIRED),

  body(ADD_USER.AGE).isInt({ min: 1 }).withMessage(VALIDATION_ERROR.AGE_TYPE),

  body(ADD_USER.EMAIL).isEmail().withMessage(VALIDATION_ERROR.INVALID_EMAIL_FORMAT),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validateUser;
