import User from "../models/user-model";
import UserRepository from "../repositories/user-repository";
import bcrypt from "bcryptjs";

export default class UserService {
  async register(
    email: string,
    password: string,
    fullName: string
  ): Promise<any> {
    try {
      // Check if there is an existing user with given email
      const existingUser = await UserRepository.findByEmail(email);
      if (existingUser) {
        throw new Error(
          `The auth account with email = [${email}] has already existed`
        );
      }

      // Hash password
      const hashPass = await this.hashPassword(password);

      const newUser = new User();
      newUser.email = email;
      newUser.password = hashPass;
      newUser.fullName = fullName;

      return await UserRepository.create(newUser);
    } catch (e) {
      throw e;
    }
  }

  async authenticate(email: string, password: string): Promise<any> {
    try {
      const existingUser = await UserRepository.findByEmail(email);
      if (existingUser) {
        if (bcrypt.compareSync(password, existingUser.password)) {
          return existingUser;
        } else {
          throw new Error(`Invalid password for email = [${email}] `);
        }
      } else {
        throw new Error(`The account with email = [${email}] does not exist`);
      }
    } catch (e) {
      throw e;
    }
  }

  async getUserById(userId: string) {
    return await UserRepository.findOne({ _id: userId });
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  }
}
