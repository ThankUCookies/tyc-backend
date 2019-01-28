import { Container } from "inversify";
import TYPES from "./types";

import { ITransactionBusinessAccess } from "../business-access/contracts/transaction";
import { IUserBusinessAccess } from "../business-access/contracts/user";
import { TransactionBusinessAccess } from "../business-access/implementations/transaction/transaction";
import { UserBusinessAccess } from "../business-access/implementations/user/user";
import IDatabase from "../resource-access/contracts/db";
import { ITransactionResourceAccess } from "../resource-access/contracts/transaction";
import { IUserResourceAccess } from "../resource-access/contracts/user";
import { Database } from "../resource-access/implementations/db/db";
import { TransactionResourceAccess } from "../resource-access/implementations/transaction/transaction";
import { UserResourceAccess } from "../resource-access/implementations/user/user";

const serviceLocator = new Container();
serviceLocator
  .bind<IUserResourceAccess>(TYPES.UserResourceAccess)
  .to(UserResourceAccess);
serviceLocator
  .bind<IUserBusinessAccess>(TYPES.UserBusinessAccess)
  .to(UserBusinessAccess);
serviceLocator.bind<IDatabase>(TYPES.Database).to(Database);
serviceLocator
  .bind<ITransactionResourceAccess>(TYPES.TransactionResourceAccess)
  .to(TransactionResourceAccess);
serviceLocator
  .bind<ITransactionBusinessAccess>(TYPES.TransactionBusinessAcess)
  .to(TransactionBusinessAccess);

export default serviceLocator;
