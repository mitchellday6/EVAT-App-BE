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

  async findWithinRadius(lat: number, lon: number, radiusKm: number): Promise<IChargingStation[] | null> {
    const radiusMeters = radiusKm * 1000;
  
    return await ChargingStation.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [lon, lat],
          },
          $maxDistance: radiusMeters,
        },
      },
    }).exec();
  }
}

export default new ChargingStationRepository();
