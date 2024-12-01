import { Router } from "express";
import { authGuard } from "../middlewares/auth-middleware";
import VehicleController from "../controllers/vehicle-controller";
import VehicleService from "../services/vehicle-service";

const router = Router();
const vehicleService = new VehicleService();
const profileController = new VehicleController(vehicleService);

// Protected routes
router.get("/:vehicleId", authGuard(["user", "admin"]), (req, res) =>
  profileController.getVehicleById(req, res)
);
router.get("/", authGuard(["user", "admin"]), (req, res) =>
  profileController.getAllVehicles(req, res)
);

export default router;
