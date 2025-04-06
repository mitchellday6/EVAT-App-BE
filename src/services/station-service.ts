import ChargingStationRepository from "../repositories/station-repository";

export default class ChargingStationService {
<<<<<<< HEAD
=======
 async getAllStations() {
  return await ChargingStationRepository.findAll();
 }

>>>>>>> 2ef7dcf44cf11a3a99ca9907205f20bee56614bb
  async getStationById(stationId: string) {
    return await ChargingStationRepository.findById(stationId);
  }

  async getStationsWithIdIn(stationIds: string[]) {
    return await ChargingStationRepository.findByIdIn(stationIds);
  }
<<<<<<< HEAD
=======

  async getNearestStation(lat: number, lon: number) {
    return await ChargingStationRepository.findNearest(lat, lon)
  }
>>>>>>> 2ef7dcf44cf11a3a99ca9907205f20bee56614bb
}
