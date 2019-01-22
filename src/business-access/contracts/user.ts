import { User } from "../../models/user";

export interface IUserBusinessAccess {
  authenticate(userName: string): Promise<string | boolean>;
  exists(userName: string): Promise<User | null>;
}
