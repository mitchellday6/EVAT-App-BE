import e, { Request, Response } from "express";
import UserService from "../services/user-service";
import { UserItemResponse } from "../dtos/user-item-response";


export default class UserController {
  constructor(private readonly userService: UserService) {}

  // Register a new user
  async register(req: Request, res: Response): Promise<Response> {
    const { email, password, fullName } = req.body;

    try {
      const user = await this.userService.register(email, password, fullName);
      return res
        .status(201)
        .json({ message: "User registered successfully", data: user });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  // Authenticate a user
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const data = await this.userService.authenticate(email, password);
      const token = {accessToken: data.accessToken, refreshToken: data.refreshToken};
      return res.status(200).json({
        message: "Login successful",
        data: {
          user: data.data,
          accessToken: token,
        },
      });
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  async refreshToken(req: Request, res: Response): Promise<Response> {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    try {
      const { accessToken } = await this.userService.refreshAccessToken(
        refreshToken
      );
      return res.status(200).json({
        message: "Token refreshed successfully",
        data: {
          accessToken,
        },
      });
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  // Get user by ID
  async getUserById(req: Request, res: Response): Promise<Response> {
    const { user } = req;
    console.log("user", user);
    try {
      const existingUser = await this.userService.getUserById(user?.id);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({
        message: "success",
        data: new UserItemResponse(existingUser),
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Get user by ID
  async getUserByEmail(req: Request, res: Response): Promise<Response> {
    const {email} = req.query;
    try {
      const existingUser = await this.userService.getUserByEmail(email as string);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({
        message: "success",
        data: new UserItemResponse(existingUser),
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Get user by ID
  async getAllUser(req: Request, res: Response): Promise<Response> {
    try {
      const existingUsers = await this.userService.getAllUser();
      return res.status(200).json({
        message: "success",
        data: existingUsers.map((u) => new UserItemResponse(u)),
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
