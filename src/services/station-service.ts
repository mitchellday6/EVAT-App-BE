import ChargingStationRepository from "../repositories/station-repository";

export default class ChargingStationService {
 async getAllStations() {
  return await ChargingStationRepository.findAll();
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
}
