import { inject, injectable } from "inversify";
import jwt from "jsonwebtoken";
import "reflect-metadata";
import TYPES from "../../../ioc/types";
import { User } from "../../../models/user";
import { IUserResourceAccess } from "../../../resource-access/contracts/user";
import { IUserBusinessAccess } from "../../contracts/user";

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
  ): Promise<string | boolean> {
    const user: User | null = await this.userResourceAccess.getUser(userName);
    if (user && user.userName === userName && user.comparePassword(password)) {
      // TODO: seperate out jwt secret into env variable
      return jwt.sign({ userName }, "secret", { expiresIn: "1d" });
    } else {
      return false;
    }
  }

  public async exists(userName: string): Promise<User | null> {
    const user: User | null = await this.userResourceAccess.getUser(userName);

    return user;
  }
}
