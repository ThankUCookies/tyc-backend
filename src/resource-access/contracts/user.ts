import { User } from "../../models/user";

export interface IUserResourceAccess {
  getUser(userName: string): Promise<User | null>;
}
