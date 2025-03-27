import { Request, Response } from "express";
import ChargingStationService from "../services/station-service";

export default class StationController {
    constructor(private readonly stationService: ChargingStationService) {}

    async getAllStations(req: Request, res: Response): Promise<Response> {
        try {
            const existingStations = await this.stationService.getAllStations();
            
            return res.status(200).json({
                message: "success",
                data: existingStations,
            });
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getStationById(req: Request, res: Response): Promise<Response> {
        const { stationId } = req.params;

        try {
            const existingStation = await this.stationService.getStationById(
                stationId
            );

            return res.status(200).json({
                message: "success",
                data: existingStation,
            });
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }
}