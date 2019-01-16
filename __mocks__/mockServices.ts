import { IUserBusinessAccess } from "../src/business-access/contracts/user";
import serviceLocator from "../src/ioc/service-locator";
import TYPES from "../src/ioc/types";
import { UserBusinessAccessMock } from "./business-access/user";

export function mockServices() {
  serviceLocator
    .rebind<IUserBusinessAccess>(TYPES.UserBusinessAccess)
    .to(UserBusinessAccessMock);
}
