import { IUserBusinessAccess } from "../business-access/contracts/user";
import serviceLocator from "../ioc/service-locator";
import TYPES from "../ioc/types";
import { UserBusinessAccessMock } from "./business-access/user";

export function mockServices() {
  serviceLocator
    .rebind<IUserBusinessAccess>(TYPES.UserBusinessAccess)
    .to(UserBusinessAccessMock);
}
