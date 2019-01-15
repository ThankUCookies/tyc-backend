import { injectable } from "inversify";
import { IUserBusinessAccess } from "../../business-access/contracts/user";
import { User } from "../../models/user";

@injectable()
export class UserBusinessAccessMock implements IUserBusinessAccess {
  public authenticate(userName: string, password: string): Promise<string> {
    return Promise.resolve("token");
  }

  public exists(userName: string): Promise<User | null> {
    return Promise.resolve(null);
  }
}
