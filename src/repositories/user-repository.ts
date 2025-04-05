import User, { IUser } from "../models/user-model";
import { FilterQuery, UpdateQuery } from "mongoose";

class UserRepository {
  async findById(userId: string): Promise<IUser | null> {
    return await User.findOne({ _id: userId }).exec();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).exec();
  }

  async findOne(filter: FilterQuery<IUser>): Promise<IUser | null> {
    return await User.findOne(filter).exec();
  }

  async findAll(filter: FilterQuery<IUser> = {}): Promise<IUser[]> {
    return await User.find(filter).select("-password").exec();
  }

  async create(data: Partial<IUser>): Promise<IUser> {
    const newUser = new User(data);
    return await newUser.save();
  }

  async update(
    filter: FilterQuery<IUser>,
    update: UpdateQuery<IUser>
  ): Promise<IUser | null> {
    return await User.findOneAndUpdate(filter, update, { new: true }).exec();
  }

  async delete(filter: FilterQuery<IUser>): Promise<IUser | null> {
    return await User.findOneAndDelete(filter).exec();
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string | null,
    expiresAt: Date | null
  ) {
    return await User.findByIdAndUpdate(
      userId,
      {
        refreshToken,
        refreshTokenExpiresAt: expiresAt,
      },
      { new: true }
    );
  }
}

export default new UserRepository();
