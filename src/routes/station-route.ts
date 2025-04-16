import { Router } from "express";
import { authGuard } from "../middlewares/auth-middleware";
import ChargingStationService from "../services/station-service";
import StationController from "../controllers/station-controller";

const router = Router();
const stationService = new ChargingStationService();
const stationController = new StationController(stationService);

/**
 * @swagger
 *  {
 *    "/api/chargers": {
 *      "get": {
 *        "tags": [
 *          "Chargers"
 *        ],
 *        "summary": "Get all chargers",
 *        "description": "Retrieve a list of all chargers",
 *        "security": [
 *          {
 *            "bearerAuth": []
 *          }
 *        ],
 *        "parameters": [
 *          {
 *            "in": "query",
 *            "name": "connector",
 *            "schema": {
 *              "type": "string"
 *            },
 *            "required": false,
 *            "description": "Connectors to filter for.<br>
 *                           Exact matches.<br>
 *                           Allows comma-separated string."
 *          },
 *          {
 *            "in": "query",
 *            "name": "current",
 *            "schema": {
 *              "type": "string"
 *            },
 *            "required": false,
 *            "description": "Current type to filter for.<br>
 *                           Accepts 'AC' ('AC (Single-Phase)'), 'AC3' ('AC (Three-Phase)'), and 'DC'.<br>
 *                           Allows comma-separated string."
 *          },
 *          {
 *            "in": "query",
 *            "name": "operator",
 *            "schema": {
 *              "type": "string"
 *            },
 *            "required": false,
 *            "description": "Operators to filter for.<br>
 *                           Exact matches.<br>
 *                           Allows comma-separated string."
 *          },
 *          {
 *            "in": "query",
 *            "name": "lat",
 *            "schema": {
 *              "type": "number"
 *            },
 *            "required": false,
 *            "description": "Latitude of search location.<br>
 *                           Required if lon or radius is present."
 *          },
 *          {
 *            "in": "query",
 *            "name": "lon",
 *            "schema": {
 *              "type": "number"
 *            },
 *            "required": false,
 *            "description": "Longitude of search location.<br>
 *                           Required if lat or radius is present."
 *          },
 *          {
 *            "in": "query",
 *            "name": "radius",
 *            "schema": {
 *              "type": "number"
 *            },
 *            "required": false,
 *            "description": "Radius of search location in Kilometers.<br>
 *                           Required if lat or lon is present."
 *          }
 *        ],
 *        "responses": {
 *          "200": {
 *            "description": "Successfully retrieved chargers list",
 *            "content": {
 *              "application/json": {
 *                "schema": {
 *                  "type": "object",
 *                  "properties": {
 *                    "message": {
 *                      "type": "string",
 *                      "example": "success"
 *                    },
 *                    "data": {
 *                      "type": "array",
 *                      "items": {
 *                        "$ref": "#/components/schemas/ChargingStation"
 *                      }
 *                    }
 *                  }
 *                }
 *              }
 *            }
 *          },
 *          "400": {
 *            "description": "Invalid parameter(s)"
 *          },
 *          "401": {
 *            "description": "Unauthorized"
 *          },
 *          "500": {
 *            "description": "Server error"
 *          }
 *        }
 *      }
 *    }
 *  }
 */
router.get("/", authGuard(["user", "admin"]), (req, res) =>
    stationController.getAllStations(req, res)
);

/**
 * @swagger
{
 *      "/api/chargers/nearest-charger": {
 *          "get": {
 *              "tags": [
 *                  "Chargers"
 *              ],
 *              "summary": "Get nearest charger",
 *              "description": "Retrieves the nearest charger",
 *              "security": [
 *                  {
 *                      "bearerAuth": []
 *                  }
 *              ],
 *              "parameters": [
 *                  {
 *                      "in": "query",
 *                      "name": "connector",
 *                      "schema": {
 *                          "type": "string"
 *                      },
 *                      "required": false,
 *                      "description": "Connectors to filter for.<br>
 *                                     Exact matches.<br>
 *                                     Allows comma-separated string."
 *                  },
 *                  {
 *                      "in": "query",
 *                      "name": "current",
 *                      "schema": {
 *                          "type": "string"
 *                      },
 *                      "required": false,
 *                      "description": "Current type to filter for.<br>
 *                                     Accepts 'AC' ('AC (Single-Phase)'), 'AC3' ('AC (Three-Phase)'), and 'DC'.<br>
 *                                     Allows comma-separated string."
 *                  },
 *                  {
 *                      "in": "query",
 *                      "name": "operator",
 *                      "schema": {
 *                          "type": "string"
 *                      },
 *                      "required": false,
 *                      "description": "Operators to filter for.<br>
 *                              Exact matches.<br>
 *                              Allows comma-separated string."
 *                  },
 *                  {
 *                      "in": "query",
 *                      "name": "lat",
 *                      "schema": {
 *                          "type": "number"
 *                      },
 *                      "required": true,
 *                      "description": "Latitude of search location."
 *                  },
 *                  {
 *                      "in": "query",
 *                      "name": "lon",
 *                      "schema": {
 *                          "type": "number"
 *                      },
 *                      "required": true,
 *                      "description": "Longitude of search location."
 *                  }
 *              ],
 *              "responses": {
 *                  "200": {
 *                      "description": "Successfully retrieved chargers list",
 *                      "content": {
 *                          "application/json": {
 *                              "schema": {
 *                                  "type": "object",
 *                                  "properties": {
 *                                      "message": {
 *                                          "type": "string",
 *                                          "example": "success"
 *                                      },
 *                                      "data": {
 *                                          "type": "object",
 *                                          "$ref": "#/components/schemas/ChargingStation"
 *                                      }
 *                                  }
 *                              }
 *                          }
 *                      }
 *                  },
 *                  "400": {
 *                    "description": "Invalid parameter(s)"
 *                  },
 *                  "401": {
 *                      "description": "Unauthorized"
 *                  },
 *                  "500": {
 *                      "description": "Server error"
 *                  }
 *              }
 *          }
 *      }
 *  }
 */
router.get("/nearest-charger", authGuard(['user', 'admin']), (req, res) =>
    stationController.getNearestStation(req, res)
);

export default router;