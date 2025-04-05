import ChargingStationRepository from "../repositories/station-repository";

export default class ChargingStationService {
  async getStationById(stationId: string) {
    return await ChargingStationRepository.findById(stationId);
  }

  async getStationsWithIdIn(stationIds: string[]) {
    return await ChargingStationRepository.findByIdIn(stationIds);
  }
}
