import { Request, Response } from "express";
import { ParsedQs } from 'qs'; // Needed for the query parameters
import ChargingStationService from "../services/station-service";
import { StationFilterOptions } from "../models/station-model";

export default class StationController {
    constructor(private readonly stationService: ChargingStationService) { }

    /**
     * Handles a request to retrieve all charging stations with optional filtering
     * 
     * @param req request object containing optional query parameters for filtering
     * @param res Response object used to send back the HTTP response 
     * @returns Returns the status code, a relevant message, and the data if the request was successful  
     */
    async getAllStations(req: Request, res: Response): Promise<Response> {
        // Clean input data and convert to an array
        let connectorTypes = req.query.connector
            ? String(req.query.connector)
                .split(',')
                .map((connector) => connector.trim()) // Trim spaces
                .filter((connector) => connector !== '') // Remove any empty strings
            : [];
        let chargingCurrents = req.query.current
            ? String(req.query.current)
                .split(',')
                .map((current) => current.trim()) // Trim spaces
                .filter((current) => current !== '') // Remove any empty strings
            : [];
        let operators = req.query.operator
            ? String(req.query.operator)
                .split(',')
                .map((operator) => operator.trim()) // Trim spaces
                .filter((operator) => operator !== '') : []; // Remove any empty strings

        // Convert AC to AC (Single-Phase), AC3 to AC (Three-Phase), and replace special characters
        chargingCurrents = chargingCurrents.map(value => {
            if (value == "AC") { return "AC (Single-Phase)"; }
            else if (value == "AC3") { return "AC (Three-Phase)"; }
            else { return value; }
        });

        // Logic for checking all or none of the parameters are provided
        let locationFilter = undefined;
        if (req.query.lat !== undefined || req.query.lon !== undefined || req.query.radius !== undefined) {
            // If any are defined, check if all are defined
            if (req.query.lat === undefined || req.query.lon === undefined || req.query.radius === undefined) {
                return res.status(400).json(
                    { message: "One or more of lat, lon, or radius is undefined. Either all or none need to provided." });
            }
            // All parameters are provided
            locationFilter = {
                longitude: Number(req.query.lon),
                latitude: Number(req.query.lat),
                radiusKm: Number(req.query.radius)
            };
        }

        try {
            const existingStations = await this.stationService.getAllStations({
                connectorTypes: connectorTypes,
                chargingCurrents: chargingCurrents,
                operators: operators,
                location: locationFilter
            });

            return res.status(200).json({
                message: "success",
                data: existingStations,
            });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
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
            return res.status(500).json({ message: error.message });
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
        // Clean input data and convert to an array
        let connectorTypes = req.query.connector
            ? String(req.query.connector)
                .split(',')
                .map((connector) => connector.trim()) // Trim spaces
                .filter((connector) => connector !== '') // Remove any empty strings
            : [];
        let chargingCurrents = req.query.current
            ? String(req.query.current)
                .split(',')
                .map((current) => current.trim()) // Trim spaces
                .filter((current) => current !== '') // Remove any empty strings
            : [];
        let operators = req.query.operator
            ? String(req.query.operator)
                .split(',')
                .map((operator) => operator.trim()) // Trim spaces
                .filter((operator) => operator !== '') : []; // Remove any empty strings

        // Convert AC to AC (Single-Phase), AC3 to AC (Three-Phase), and replace special characters
        chargingCurrents = chargingCurrents.map(value => {
            if (value == "AC") { return "AC (Single-Phase)"; }
            else if (value == "AC3") { return "AC (Three-Phase)"; }
            else { return value; }
        });

        // Logic for checking if location is provided
        let locationFilter = undefined;
        if (req.query.lat == undefined || req.query.lon == undefined) {
            return res.status(400).json(
                { message: "One or more of lat, or lon is undefined. Either all or none need to provided." });
        }
        else {
            locationFilter = {
                longitude: Number(req.query.lon),
                latitude: Number(req.query.lat)
            };
        }

        try {
            const nearestStation = await this.stationService.getNearestStation({
                connectorTypes: connectorTypes,
                chargingCurrents: chargingCurrents,
                operators: operators,
                location: locationFilter
            });
            return res.status(200).json({
                message: "success",
                data: nearestStation
            });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}