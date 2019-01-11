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

  public async authenticate(
    userName: string,
    password: string,
  ): Promise<boolean> {
    const user: User | null = await this.userResourceAccess.getUser(userName);
    // TODO: hash the password before comparing
    if (user && user.userName === userName && user.passwordHash === password) {
      return true;
    } else {
      return false;
    }
  }
}
