import { Router } from "express";
import UserController from "../controllers/user-controller";
import UserService from "../services/user-service";
import { authGuard } from "../middlewares/auth-middleware";
import ProfileService from "../services/profile-service";
import ProfileController from "../controllers/profile-controller";
import VehicleService from "../services/vehicle-service";
import ChargingStationService from "../services/station-service";

const router = Router();
const userService = new UserService();
const profileService = new ProfileService();
const vehicleService = new VehicleService();
const stationService = new ChargingStationService();
const profileController = new ProfileController(
  userService,
  profileService,
  vehicleService,
  stationService
);

// Protected routes
router.get("/user-profile", authGuard(["user", "admin"]), (req, res) =>
  profileController.getUserProfile(req, res)
);
router.post("/vehicle-model", authGuard(["user", "admin"]), (req, res) =>
  profileController.updateUserVehicleModel(req, res)
);

router.post(
  "/add-favourite-station",
  authGuard(["user", "admin"]),
  (req, res) => profileController.addFavouriteStation(req, res)
);

router.post(
  "/remove-favourite-station",
  authGuard(["user", "admin"]),
  (req, res) => profileController.deleteFavouriteStation(req, res)
);

export default router;
