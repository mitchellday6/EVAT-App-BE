import { Request, Response } from "express";
import ChargingStationService from "../services/station-service";

export default class StationController {
    constructor(private readonly stationService: ChargingStationService) {}

    /**
     * Handles a request to get all charging stations
     * 
     * @param req --Not used in this segment--
     * @param res Response object used to send back the HTTP response
     * @returns Returns the status code, a relevant message, and the data if the request was successful
     */
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

    /**
     * Handles a request to get a station by ID
     * 
     * @param req Request object containing the Station ID
     * @param res Response object used to send back the HTTP response 
     * @returns Returns the status code, a relevant message, and the data if the request was successful   
     */
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

    /**
     * Handles a request for finding the nearest station
     * 
     * @param req Request object containing the current latitude and longitude 
     * @param res Response object used to send back the HTTP response 
     * @returns Returns the status code, a relevant message, and the data of the nearest station if the request was successful   
     */
    async getNearestStation(req: Request, res: Response): Promise<Response> {
        const {lat, lon} = req.query;
        try{
            const nearestStation = await this.stationService.getNearestStation(
                Number(lat), Number(lon) // Parameters are given as string but need to be numbers
            )
            return res.status(200).json({
                message: "success",
                data: nearestStation
            });
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }
}