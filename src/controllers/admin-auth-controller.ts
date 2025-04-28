import { Request, Response } from 'express';
import Admin from '../models/admin';
import jwt from 'jsonwebtoken';

/**
 * Handles an admin login request
 * 
 * @param req Request object containing an email and a password
 * @param res Response object used to send back the HTTP response
 * @returns If error: Return an error message. If successful: return a login token with an expiry of 1 day
 */
export const adminLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({});

  if (!admin || admin.username !== username || admin.password !== password) {
    return res.status(401).json({ message: 'Invalid admin credentials' });
  }

  const token = jwt.sign({ admin: true }, process.env.JWT_SECRET!, { expiresIn: '1d' });
  res.json({ token });
};

/**
 * Handles a request to update the credentials of an admin account
 * 
 * @param req Request object containing a new email and password, and the admin user to update
 * @param res Response object used to send back the HTTP response
 * @returns If error: Return an error message. If successful: update the credentials of the admin account
 */
export const updateAdminCredentials = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({});

  if (!admin) return res.status(404).json({ message: 'Admin not found' });

  admin.username = username || admin.username;
  admin.password = password || admin.password;

  await admin.save();
  res.json({ message: 'Admin credentials updated' });
};
