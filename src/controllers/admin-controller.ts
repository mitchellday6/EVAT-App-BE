import { Request, Response } from 'express';
import User from '../models/user-model';
import Vehicle from '../models/vehicle-model';

export const listUsers = async (req: Request, res: Response) => {
  const users = await User.find({}, '-password');
  res.json(users);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: 'User deleted' });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
  res.json(updatedUser);
};

export const getLogs = async (req: Request, res: Response) => {
  // Dummy logs
  res.json([{ action: 'login', user: 'admin', timestamp: new Date() }]);
};

export const getInsights = async (req: Request, res: Response) => {
  const totalUsers = await User.countDocuments();
  const totalVehicles = await Vehicle.countDocuments();
  res.json({ totalUsers, totalVehicles });
};
