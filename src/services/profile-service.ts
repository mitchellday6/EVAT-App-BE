import Profile from "../models/profile-model";
import ProfileRepository from "../repositories/profile-repository";

export default class ProfileService {
  async updateUserVehicleModel(
    userId: string,
    vehicleId: string
  ): Promise<any> {
    try {
      // Check if there is an existing tracking for this userId
      const existingTracking = await ProfileRepository.findByUserId(userId);
      if (!existingTracking) {
        const newProfile = new Profile();
        newProfile.user_id = userId;
        newProfile.user_car_model = vehicleId;
        return await ProfileRepository.create(newProfile);
      } else {
        return await ProfileRepository.updateByUserId(userId, {
          userCarModel: vehicleId,
        });
      }
    } catch (e) {
      throw e;
    }
  }

  async addFavouriteStation(userId: string, stationId: string): Promise<any> {
    try {
      // Check if there is an existing tracking for this userId
      const existingTracking = await ProfileRepository.findByUserId(userId);
      if (!existingTracking) {
        const newProfile = new Profile();
        newProfile.user_id = userId;
        newProfile.favourite_stations = [stationId];
        return await ProfileRepository.create(newProfile);
      } else {
        return await ProfileRepository.updateByUserId(userId, {
          $push: { favourite_stations: stationId },
        });
      }
    } catch (e) {
      throw e;
    }
  }

  async removeFavouriteStation(
    userId: string,
    stationId: string
  ): Promise<any> {
    try {
      // Check if there is an existing tracking for this userId
      const existingTracking = await ProfileRepository.findByUserId(userId);
      if (!existingTracking) {
        throw new Error(
          `The station tracking with userId = [${userId}] does not exist`
        );
      } else {
        return await ProfileRepository.updateByUserId(userId, {
          $pull: { favourite_stations: stationId },
        });
      }
    } catch (e) {
      throw e;
    }
  }

  async getUserProfile(userId: string) {
    try {
      // Check if there is an existing tracking for this userId
      const existingTracking = await ProfileRepository.findByUserId(userId);
      if (!existingTracking) {
        return {
          user_id: userId,
          user_car_model: null,
          favourite_stations: [],
        };
      } else return existingTracking;
    } catch (e) {
      throw e;
    }
  }
}
