import jwt from "jsonwebtoken";
import { IUser } from "../models/user-model";

const generateToken = (user: IUser) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    secret as string,
    { expiresIn: "1d" }
  );
  return token;
};

export default generateToken;
