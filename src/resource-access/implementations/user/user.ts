import { injectable } from "inversify";
import "reflect-metadata";
import { User } from "../../../models/user";
import { IUserResourceAccess } from "../../contracts/user";

@injectable()
export class UserResourceAccess implements IUserResourceAccess {
  public async getUser(userName: string): Promise<User | null> {
    return await User.findOne({ where: { userName } });
  }
}
