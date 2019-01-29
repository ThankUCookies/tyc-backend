import { IUserBusinessAccess } from "../src/business-access/contracts/user";
import serviceLocator from "../src/ioc/service-locator";
import TYPES from "../src/ioc/types";
import { ITransactionResourceAccess } from "../src/resource-access/contracts/transaction";
import { IUserResourceAccess } from "../src/resource-access/contracts/user";
import { UserResourceAccess } from "../src/resource-access/implementations/user/user";
import { UserBusinessAccessMock } from "./business-access/user";
import { TransactionResourceAccessMock } from "./resource-access/transaction";

export function mockServices() {
  serviceLocator
    .rebind<IUserBusinessAccess>(TYPES.UserBusinessAccess)
    .to(UserBusinessAccessMock);
  serviceLocator
    .rebind<IUserResourceAccess>(TYPES.UserResourceAccess)
    .to(UserResourceAccess);
  serviceLocator
    .rebind<ITransactionResourceAccess>(TYPES.TransactionResourceAccess)
    .to(TransactionResourceAccessMock);
}
