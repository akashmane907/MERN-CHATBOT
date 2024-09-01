import { NextFunction, Request, Response } from 'express';
import { body, ValidationChain, validationResult } from 'express-validator';

// Middleware to validate request using provided validation chains
const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run all validations
    for (const validation of validations) {
      await validation.run(req);
    }

    // Collect validation errors
    const errors = validationResult(req);
    
    // If errors exist, respond with status 422 and error details
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Proceed to the next middleware if no errors
    next();
  };
};

// Validation rules for user signup
const signupValidator: ValidationChain[] = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Please enter a valid email'),
  body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('confirmPassword').custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match')
];

// Validation rules for user login
const loginValidator: ValidationChain[] = [
  body('email').trim().isEmail().withMessage('Please enter a valid email'),
  body('password').trim().notEmpty().withMessage('Password is required')
];

export { validate, signupValidator, loginValidator };


//validation ruls for openAi chat

export const chatCompletionValidator=[
  body('message').notEmpty().withMessage('message is required')
]
