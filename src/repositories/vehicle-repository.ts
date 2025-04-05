import Vehicle, { IVehicle } from "../models/vehicle-model";
import { FilterQuery } from "mongoose";

class VehicleRepository {
  async findById(vehicleId: string): Promise<IVehicle | null> {
    return await Vehicle.findById(vehicleId).exec();
  }

  async findAll(filter: FilterQuery<IVehicle> = {}): Promise<IVehicle[]> {
    return await Vehicle.find(filter).exec();
  }
}

export default new VehicleRepository();
