import { injectable } from "inversify";
import { User } from "../models/user";
import { IUserResourceAccess } from "./contracts/user";

@injectable()
export class UserResourceAccess implements IUserResourceAccess {
  public async getUser(userName: string): Promise<User | null> {
    return Promise.resolve(null);
  }
}
