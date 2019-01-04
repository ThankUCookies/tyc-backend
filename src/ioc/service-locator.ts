import { Container } from "inversify";
import TYPES from "./types";

import { IUserBusinessAccess } from "../business-access/contracts/user";
import { UserBusinessAccess } from "../business-access/implementations/user";
import { IUserResourceAccess } from "../resource-access/contracts/user";
import { UserResourceAccess } from "../resource-access/implementations/user";

const serviceLocator = new Container();
serviceLocator
  .bind<IUserResourceAccess>(TYPES.UserResourceAccess)
  .to(UserResourceAccess);
serviceLocator
  .bind<IUserBusinessAccess>(TYPES.UserBusinessAccess)
  .to(UserBusinessAccess);

export default serviceLocator;
