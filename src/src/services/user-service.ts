import User from "../models/user-model";
import UserRepository from "../repositories/user-repository";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generate-token";
import jwt from "jsonwebtoken";

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

  async authenticate(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const existingUser = await UserRepository.findByEmail(email);
      if (existingUser) {
        if (bcrypt.compareSync(password, existingUser.password)) {
          // Generate tokens
          const accessToken = generateToken(existingUser, "1h");
          const refreshToken = generateToken(existingUser, "1d");

          // Save refresh token to database
          const refreshTokenExpiresAt = new Date(
            Date.now() + 24 * 60 * 60 * 1000
          ); // 1 day from now
          await UserRepository.updateRefreshToken(
            existingUser.id,
            refreshToken,
            refreshTokenExpiresAt
          );

          return {
            accessToken,
            refreshToken,
          };
        } else {
          throw new Error(`Invalid password for email = [${email}]`);
        }
      } else {
        throw new Error(`The account with email = [${email}] does not exist`);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error("Authentication failed: " + e.message);
      } else {
        throw new Error("An unknown error occurred during authentication.");
      }
    }
  }

  async refreshAccessToken(
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      // Verify the refresh token
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error("JWT_SECRET is not defined");
      }

      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET as string
      ) as {
        id: string;
        email: string;
        role: string;
      };

      // Find user and check if refresh token is valid
      const user = await UserRepository.findById(decoded.id);

      if (!user || user.refreshToken !== refreshToken) {
        throw new Error("Invalid refresh token");
      }

      // Check if refresh token is expired
      if (
        user.refreshTokenExpiresAt &&
        user.refreshTokenExpiresAt < new Date()
      ) {
        throw new Error("Refresh token has expired");
      }

      // Generate new tokens
      const newAccessToken = generateToken(user, "1h");
      const newRefreshToken = generateToken(user, "1d");

      // Update refresh token in database
      const refreshTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
      await UserRepository.updateRefreshToken(
        user.id,
        newRefreshToken,
        refreshTokenExpiresAt
      );

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Failed to refresh token: " + error.message);
      }
      throw new Error("An unknown error occurred while refreshing token");
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
