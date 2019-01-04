import { injectable } from "inversify";
import "reflect-metadata";
import { User } from "../../models/user";
import { IUserResourceAccess } from "../contracts/user";

@injectable()
export class UserResourceAccess implements IUserResourceAccess {
  public getUser(userName: string): User {
    return {
      PasswordHash: "password-hash",
      UserName: userName,
    };
  }
}
