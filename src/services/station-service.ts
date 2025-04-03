import { FilterQuery } from "mongoose";
import ChargingStationRepository from "../repositories/station-repository";

export default class ChargingStationService {
  async getAllStations(connectorArray: string[]) {
    if (!connectorArray.length) {
      return await ChargingStationRepository.findAll();
    }
    else {
      const filterQuery: FilterQuery<{ connection_type: string }> = {
        connection_type: {
          $in: connectorArray.map(value => new RegExp(value, "i"))
        }
      };
      // Creates a filter along the lines of { connection_type: { '$in': [ /Tesla/i, /CHAdeMO/i ] } }
      return await ChargingStationRepository.findAll(filterQuery);
    }
  }

  async getStationById(stationId: string) {
    return await ChargingStationRepository.findById(stationId);
  }

  async getStationsWithIdIn(stationIds: string[]) {
    return await ChargingStationRepository.findByIdIn(stationIds);
  }

  async getNearestStation(lat: number, lon: number) {
    return await ChargingStationRepository.findNearest(lat, lon)
  }

  async getByRadius(lat: number, lon: number, radiusKm: number) {
    return await ChargingStationRepository.findWithinRadius(lat, lon, radiusKm)
  }
}
