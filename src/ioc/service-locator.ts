import { Container } from "inversify";
import TYPES from "./types";

import { IUserBusinessAccess } from "../business-access/contracts/user";
import { UserBusinessAccess } from "../business-access/implementations/user/user";
import IDatabase from "../resource-access/contracts/db";
import { IUserResourceAccess } from "../resource-access/contracts/user";
import { Database } from "../resource-access/implementations/db/db";
import { UserResourceAccess } from "../resource-access/implementations/user";

const serviceLocator = new Container();
serviceLocator
  .bind<IUserResourceAccess>(TYPES.UserResourceAccess)
  .to(UserResourceAccess);
serviceLocator
  .bind<IUserBusinessAccess>(TYPES.UserBusinessAccess)
  .to(UserBusinessAccess);
serviceLocator.bind<IDatabase>(TYPES.Database).to(Database);

export default serviceLocator;
