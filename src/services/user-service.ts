import User from "../models/user-model";
import UserRepository from "../repositories/user-repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";  // Import jwt library

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "default_secret";  // Get the secret key from environment

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

  // Authenticate user and return JWT token
  async authenticate(email: string, password: string): Promise<any> {
    try {
      const existingUser = await UserRepository.findByEmail(email);
      if (!existingUser) {
        throw new Error(`Account with email ${email} does not exist.`);
      }

      // Compare the password with the stored hash
      const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
        
      if (!isPasswordValid) {
        throw new Error("Invalid password.");
      }

      // Generate JWT token if password is correct
      const token = this.generateJWT(existingUser._id);

      // Return user data along with the JWT token
      return { user: existingUser, token };
    } catch (e: unknown) {
      // Safely handle error if it's an instance of Error
      if (e instanceof Error) {
        throw new Error("Authentication failed: " + e.message);
      } else {
        throw new Error("An unknown error occurred during authentication.");
      }
    }
  }

  // Generate JWT token
  private generateJWT(userId: string): string {
    const payload = {
      userId,
      //Add role and email of users 
    };

    // Sign the token with the secret key and set an expiration time
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
    return token;
  }

  // Get user by ID
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
