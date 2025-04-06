import ChargingStation, { IChargingStation } from "../models/station-model";
<<<<<<< HEAD

class ChargingStationRepository {
=======
import { FilterQuery } from "mongoose";

class ChargingStationRepository {
  async findAll(filter: FilterQuery<IChargingStation> = {}): Promise<IChargingStation[]> {
    return await ChargingStation.find(filter).exec();
  }

>>>>>>> 2ef7dcf44cf11a3a99ca9907205f20bee56614bb
  async findById(stationId: string): Promise<IChargingStation | null> {
    return await ChargingStation.findById(stationId).exec();
  }

  async findByIdIn(stationIds: string[]): Promise<IChargingStation[]> {
    return await ChargingStation.find({
      _id: { $in: stationIds },
    });
  }
<<<<<<< HEAD
=======

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
>>>>>>> 2ef7dcf44cf11a3a99ca9907205f20bee56614bb
}

export default new ChargingStationRepository();
