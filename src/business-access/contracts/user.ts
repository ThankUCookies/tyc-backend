export interface IUserBusinessAccess {
  authenticate(userName: string, password: string): boolean;
}
