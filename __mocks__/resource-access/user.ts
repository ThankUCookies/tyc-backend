import { injectable } from "inversify";
import { User } from "../../src/models/user";
import { IUserResourceAccess } from "../../src/resource-access/contracts/user";

@injectable()
export class UserResourceAccess implements IUserResourceAccess {
  public async getUser(userName: string): Promise<User | null> {
    return Promise.resolve(null);
  }
}
