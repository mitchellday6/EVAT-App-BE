import { Request, Response } from "express";
import { ParsedQs } from 'qs'; // Needed for the query parameters
import ChargingStationService from "../services/station-service";

export default class StationController {
    constructor(private readonly stationService: ChargingStationService) {}

    async getAllStations(req: Request, res: Response): Promise<Response> {
        const { connector } = req.query;

        let connectorArray: string[] = [];
        if (typeof connector === 'string') {
            connectorArray = connector.split(",").map(item => item.trim());
        }

        console.log(typeof(connector));
        console.log(typeof(connectorArray));
        console.log(connector);
        console.log(connectorArray);
        
        try {
            const existingStations = await this.stationService.getAllStations(connectorArray);
            
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
                data: existingStation
            });
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getNearestStation(req: Request, res: Response): Promise<Response> {
        const {lat, lon} = req.query;
        try {
            const nearestStation = await this.stationService.getNearestStation(
                Number(lat), Number(lon) // Parameters are given as string but need to be numbers
            );
            return res.status(200).json({
                message: "success",
                data: nearestStation
            });
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getByRadius(req: Request, res: Response): Promise<Response> {
        const {lat, lon, radius} = req.query;
        try {
            const stations = await this.stationService.getByRadius(
                Number(lat), Number(lon), Number(radius)
            );
            return res.status(200).json({
                message: "success",
                data: stations
            });
        } catch (error: any) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
}