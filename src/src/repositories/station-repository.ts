import ChargingStation, { IChargingStation } from "../models/station-model";
import { FilterQuery } from "mongoose";

class ChargingStationRepository {

    /**
     * Find all charging stations within the filter condition
     * 
     * @param filter A filter used to identify 
     * @returns Returns all Charging Stations that fulfill the filter condition
     */
  async findAll(filter: FilterQuery<IChargingStation> = {}): Promise<IChargingStation[]> {
    return await ChargingStation.find(filter).exec();
  }

    /**
     * Find a charging station by its ID
     * 
     * @param stationId A charging stations id
     * @returns Returns the charging stations data if found, or null if not
     */
  async findById(stationId: string): Promise<IChargingStation | null> {
    return await ChargingStation.findById(stationId).exec();
  }

    /**
     * Find multiple stations by their IDs
     * 
     * @param stationIds An array of chargin station IDs to search for
     * @returns Returns a an array of charging station data which match the provided IDs
     */
  async findByIdIn(stationIds: string[]): Promise<IChargingStation[]> {
    return await ChargingStation.find({
      _id: { $in: stationIds },
    });
  }

    /**
     * Find the nearest charing station to a certain lat-lon position
     * 
     * @param lat A latitude position
     * @param lon A latitude position
     * @returns Returns the nearest charging station to the input position
     */
  async findNearest(lat: number, lon: number): Promise<IChargingStation | null> {
    return await ChargingStation.findOne({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [lon, lat],
          },
        },
      },
    }).exec();
  }
}

export default new ChargingStationRepository();
