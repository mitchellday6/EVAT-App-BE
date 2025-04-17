import { Request, Response } from 'express';
import User from '../models/user-model';
import Vehicle from '../models/vehicle-model';

/**
 * Handles a request to get all users (Admin only)
 * 
 * @param req --Not used in this segment--
 * @param res Response object used to send back the HTTP response containing all users, without including password data
 */
export const listUsers = async (req: Request, res: Response) => {
  const users = await User.find({}, '-password');
  res.json(users);
};

/**
 * Handles a request to delete a users account
 * 
 * @param req Request object containing the User ID
 * @param res Response object used to send back the HTTP response message
 */
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: 'User deleted' });
};

/**
 * Handles a request to update a users information
 * 
 * @param req Request object containing the user ID, and the required updates to be done to the user
 * @param res Response object used to send back the updated user data in a JSON format
 */
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
  res.json(updatedUser);
};

/**
 * Handles a request to get logs
 * 
 * @param req --Not used in this segment--
 * @param res Response object containing logs of what user did what and when in a JSON format
 */
export const getLogs = async (req: Request, res: Response) => {
  // Dummy logs
  res.json([{ action: 'login', user: 'admin', timestamp: new Date() }]);
};

/**
 * Handles a request to get insights into the database
 * 
 * @param req --Not used in this segment--
 * @param res Response object containing the current number of users and vehicles in the system
 */
export const getInsights = async (req: Request, res: Response) => {
  const totalUsers = await User.countDocuments();
  const totalVehicles = await Vehicle.countDocuments();
  res.json({ totalUsers, totalVehicles });
};
