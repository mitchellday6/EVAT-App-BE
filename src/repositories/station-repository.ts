import ChargingStation, { IChargingStation } from "../models/station-model";

class ChargingStationRepository {
  async findById(stationId: string): Promise<IChargingStation | null> {
    return await ChargingStation.findById(stationId).exec();
  }

  async findByIdIn(stationIds: string[]): Promise<IChargingStation[]> {
    return await ChargingStation.find({
      _id: { $in: stationIds },
    });
  }
}

export default new ChargingStationRepository();
