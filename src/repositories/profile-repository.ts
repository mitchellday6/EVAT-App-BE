import Profile, { IProfile } from "../models/profile-model";
import { FilterQuery, UpdateQuery } from "mongoose";

class ProfileRepository {
  async findByUserId(userId: string): Promise<IProfile | null> {
    return await Profile.findOne({ user_id: userId }).exec();
  }

  async create(data: Partial<IProfile>): Promise<IProfile> {
    const newProfile = new Profile(data);
    return await newProfile.save();
  }

  async updateByUserId(
    userId: string,
    update: UpdateQuery<IProfile>
  ): Promise<IProfile | null> {
    return await Profile.findOneAndUpdate({ user_id: userId }, update, {
      new: true,
    }).exec();
  }
}

export default new ProfileRepository();
