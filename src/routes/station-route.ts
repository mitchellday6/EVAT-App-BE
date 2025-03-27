import { Router } from "express";
import { authGuard } from "../middlewares/auth-middleware";
import ChargingStationService from "../services/station-service";
import StationController from "../controllers/station-controller";

const router = Router();
const stationService = new ChargingStationService();
const stationController = new StationController(stationService);

/**
 * @swagger
 * /api/station:
 *   get:
 *     tags:
 *       - Chargers
 *     summary: Get all chargers
 *     description: Retrieve a list of all chargers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved chargers list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/ChargingStation'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", authGuard(["user", "admin"]), (req, res) =>
    stationController.getAllStations(req, res)
);

//todo Implement other charger api calls (by id, by distance, and nearest)

export default router;