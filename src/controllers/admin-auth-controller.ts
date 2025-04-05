import { Request, Response } from 'express';
import Admin from '../models/admin';
import jwt from 'jsonwebtoken';

export const adminLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({});

  if (!admin || admin.username !== username || admin.password !== password) {
    return res.status(401).json({ message: 'Invalid admin credentials' });
  }

  const token = jwt.sign({ admin: true }, process.env.JWT_SECRET!, { expiresIn: '1d' });
  res.json({ token });
};

export const updateAdminCredentials = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({});

  if (!admin) return res.status(404).json({ message: 'Admin not found' });

  admin.username = username || admin.username;
  admin.password = password || admin.password;

  await admin.save();
  res.json({ message: 'Admin credentials updated' });
};
