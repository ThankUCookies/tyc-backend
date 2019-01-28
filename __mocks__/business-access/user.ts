import { injectable } from "inversify";
import { IUserBusinessAccess } from "../../src/business-access/contracts/user";
import { User } from "../../src/models/user";

@injectable()
export class UserBusinessAccessMock implements IUserBusinessAccess {
  public authenticate(userName: string): Promise<string | boolean> {
    return Promise.resolve("token");
  }

  public exists(userName: string): Promise<User | null> {
    return Promise.resolve(null);
  }
}
