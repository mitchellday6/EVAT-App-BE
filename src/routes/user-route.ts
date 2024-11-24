import { Router } from "express";
import UserController from "../controllers/user-controller";
import UserService from "../services/user-service";

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

// Register a new user
router.post("/register", (req, res) => userController.register(req, res));

// Login a user
router.post("/login", (req, res) => userController.login(req, res));

// Get user by ID
router.get("/:id", (req, res) => userController.getUserById(req, res));

export default router;
