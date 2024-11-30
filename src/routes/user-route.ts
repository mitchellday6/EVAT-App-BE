import { Router } from "express";
import UserController from "../controllers/user-controller";
import UserService from "../services/user-service";
import { authGuard } from "../middlewares/auth-middleware";

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "Milly"
 *               username:
 *                 type: string
 *                 example: "example@deakin.edu.au"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       401:
 *         description: Invalid request
 */
router.post("/register", (req, res) => userController.register(req, res));

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login
 *     description: Log in by providing email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "example@deakin.edu.au"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", (req, res) => userController.login(req, res));

// Protected routes
router.get("/profile", authGuard(["user", "admin"]), (req, res) =>
  userController.getUserById(req, res)
);
router.get("/user-list", authGuard(["admin"]), (req, res) =>
  userController.getAllUser(req, res)
);

export default router;
