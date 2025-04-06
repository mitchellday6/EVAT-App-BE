import { Request, Response } from "express";
import VehicleService from "../services/vehicle-service";

export default class ProfileController { //todo rename to something like "VehicleController"
  constructor(private readonly vehicleService: VehicleService) {}

  async getVehicleById(req: Request, res: Response): Promise<Response> {
    const { vehicleId } = req.params;

    try {
      const existingVehicle = await this.vehicleService.getVehicleById(
        vehicleId
      );

      return res.status(201).json({
        message: "success",
        data: existingVehicle,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getAllVehicles(req: Request, res: Response): Promise<Response> {
    try {
      const existingVehicles = await this.vehicleService.getAllVehicles();

      return res.status(201).json({
        message: "success",
        data: existingVehicles,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
