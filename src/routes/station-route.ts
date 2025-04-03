import { Router } from "express";
import { authGuard } from "../middlewares/auth-middleware";
import ChargingStationService from "../services/station-service";
import StationController from "../controllers/station-controller";

const router = Router();
const stationService = new ChargingStationService();
const stationController = new StationController(stationService);

/**
 * @swagger
 * /api/chargers:
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

/**
 * @swagger
 * /api/chargers/nearest-charger:
 *   get:
 *     tags:
 *       - Chargers
 *     summary: Get nearest charger
 *     description: Retrieves the nearest charger
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: lat
 *         schema:
 *           type: number
 *         required: true
 *         description: Latitude of the user's location.
 *       - in: query
 *         name: lon
 *         schema:
 *           type: number
 *         required: true
 *         description: Longitude of the user's location.
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
 *                   type: object
 *                   $ref: '#/components/schemas/ChargingStation'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/nearest-charger", authGuard(['user', 'admin']), (req, res) =>
    stationController.getNearestStation(req, res)
);

/**
 * @swagger
 * /api/chargers/charger-radius:
 *   get:
 *     tags:
 *       - Chargers
 *     summary: Get all chargers within radius
 *     description: Retrieve a list of all chargers within a provided radius
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: lat
 *         schema:
 *           type: number
 *         required: true
 *         description: Latitude of the user's location.
 *       - in: query
 *         name: lon
 *         schema:
 *           type: number
 *         required: true
 *         description: Longitude of the user's location.
 *       - in: query
 *         name: radius
 *         schema:
 *           type: number
 *         required: true
 *         description: Radius in Kilometers to search
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
router.get("/charger-radius", authGuard(['user', 'admin']), (req, res) =>
    stationController.getByRadius(req, res)
);

//todo Implement other charger api calls (by id(✅), by distance(✅), nearest (✅), filters)

export default router;