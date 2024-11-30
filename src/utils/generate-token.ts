import jwt from "jsonwebtoken";
import { IUser } from "../models/user-model";

const generateToken = (user: IUser) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

export default generateToken;