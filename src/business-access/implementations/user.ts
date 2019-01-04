import { inject, injectable } from "inversify";
import "reflect-metadata";
import TYPES from "../../ioc/types";
import { User } from "../../models/user";
import { IUserResourceAccess } from "../../resource-access/contracts/user";
import { IUserBusinessAccess } from "../contracts/user";

@injectable()
export class UserBusinessAccess implements IUserBusinessAccess {
  private userResourceAccess: IUserResourceAccess;

  constructor(
    @inject(TYPES.UserResourceAccess) userResourceAccess: IUserResourceAccess,
  ) {
    this.userResourceAccess = userResourceAccess;
  }

  public authenticate(userName: string, password: string): boolean {
    const user: User = this.userResourceAccess.getUser(userName);

    if (user.UserName === userName && user.PasswordHash === password) {
      return true;
    } else {
      return false;
    }
  }
}
