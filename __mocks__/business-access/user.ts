import { injectable } from "inversify";
import { User } from "../models/user";
import { IUserBusinessAccess } from "./contracts/user";

@injectable()
export class UserBusinessAccessMock implements IUserBusinessAccess {
  public authenticate(userName: string, password: string): Promise<string> {
    return Promise.resolve("token");
  }

  public exists(userName: string): Promise<User | null> {
    return Promise.resolve(null);
  }
}
