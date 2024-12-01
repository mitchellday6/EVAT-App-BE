import User from "../models/user-model";
import UserRepository from "../repositories/user-repository";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generate-token";

export default class UserService {
  // Register a new user
  async register(
    email: string,
    password: string,
    fullName: string
  ): Promise<any> {
    try {
      // Check if there is an existing user with the given email
      const existingUser = await UserRepository.findByEmail(email);
      if (existingUser) {
        throw new Error(
          `The auth account with email = [${email}] has already existed`
        );
      }

      // Hash password
      const hashPass = await this.hashPassword(password);

      const newUser = new User();
      newUser.email = email;
      newUser.password = hashPass;
      newUser.fullName = fullName;

      return await UserRepository.create(newUser);
    } catch (e: unknown) {
      // Safely handle error if it's an instance of Error
      if (e instanceof Error) {
        throw new Error("Error during user registration: " + e.message);
      } else {
        throw new Error("An unknown error occurred during registration.");
      }
    }
  }

  async authenticate(email: string, password: string): Promise<string> {
    try {
      const existingUser = await UserRepository.findByEmail(email);
      if (existingUser) {
        if (bcrypt.compareSync(password, existingUser.password)) {
          // Generate JWT token
          const token = generateToken(existingUser);
          // Return both user and token
          return token;
        } else {
          throw new Error(`Invalid password for email = [${email}] `);
        }
      } else {
        throw new Error(`The account with email = [${email}] does not exist`);
      }
    } catch (e: unknown) {
      // Safely handle error if it's an instance of Error
      if (e instanceof Error) {
        throw new Error("Authentication failed: " + e.message);
      } else {
        throw new Error("An unknown error occurred during authentication.");
      }
    }
  }

  async getAllUser() {
    return await UserRepository.findAll();
  }

  async getUserById(userId: string) {
    return await UserRepository.findOne({ _id: userId });
  }

  // Hash password
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  }
}
