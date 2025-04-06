import ChargingStation, { IChargingStation } from "../models/station-model";
import { FilterQuery } from "mongoose";

class ChargingStationRepository {
  async findAll(filter: FilterQuery<IChargingStation> = {}): Promise<IChargingStation[]> {
    return await ChargingStation.find(filter).exec();
  }

  async findById(stationId: string): Promise<IChargingStation | null> {
    return await ChargingStation.findById(stationId).exec();
  }

  async findByIdIn(stationIds: string[]): Promise<IChargingStation[]> {
    return await ChargingStation.find({
      _id: { $in: stationIds },
    });
  }

  async findNearest(filter: FilterQuery<IChargingStation> = {}): Promise<IChargingStation | null> {
    return await ChargingStation.findOne(filter).exec();
  }
}

export default new ChargingStationRepository();
