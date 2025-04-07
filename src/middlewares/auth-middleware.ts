import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/user-repository";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export const authGuard = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get token from header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
      }

      // Extract token
      const token = authHeader.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      // Check if user still exists
      const user = await UserRepository.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "User no longer exists" });
      }

      // Check if user has required role
      if (!allowedRoles.includes(user.role)) {
        return res
          .status(403)
          .json({ message: "Not authorized to access this route" });
      }

      // Add user to request object
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};
