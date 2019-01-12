import { User } from "../../models/user";

export interface IUserBusinessAccess {
  authenticate(userName: string, password: string): Promise<string | boolean>;
  exists(userName: string): Promise<User | null>;
}
