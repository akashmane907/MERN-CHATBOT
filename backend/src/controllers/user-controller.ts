import { NextFunction, Request, Response } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { createToken } from '../utils/token-manager.js';
import { COOKIE_NAME } from '../utils/constants.js';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  // Get all users
  try {
    const users = await User.find();
    return res.status(200).json({ message: 'Users fetched successfully', users });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching users', cause: error.message });
  }
};

export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
  // Signup a new user
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Clear existing cookie
    res.clearCookie(COOKIE_NAME, {
      path: '/',
      httpOnly: true,
      signed: true,
    });

    // Create and set new token
    const token = createToken(newUser._id.toString(), newUser.email, '7d');
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: '/',
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(201).json({ message: 'User created successfully', name: newUser.name, email: newUser.email });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user', cause: error.message });
  }
};

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  // Login user
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Clear existing cookie
    res.clearCookie(COOKIE_NAME, {
      path: '/',
      httpOnly: true,
      signed: true,
    });

    // Create and set new token
    const token = createToken(user._id.toString(), user.email, '7d');
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: '/',
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({ message: 'Logged in successfully', name: user.name, email: user.email,token });
  } catch (error) {
    return res.status(500).json({ message: 'Error logging in', cause: error.message });
  }
};

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  // Verify user based on token
  try {
    const userId = res.locals.jwtData.id;
    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ message: 'User not found or token is invalid' });

    return res.status(200).json({ message: 'User verified successfully', name: user.name, email: user.email });
  } catch (error) {
    return res.status(500).json({ message: 'Error verifying user', cause: error.message });
  }
};
