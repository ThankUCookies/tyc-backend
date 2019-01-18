import bcrypt from "bcryptjs";
import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model<User> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id: number;
  @Column
  public userName: string;
  @Column
  public get passwordHash(): string {
    return this.getDataValue("passwordHash");
  }
  public set passwordHash(value: string) {
    this.setDataValue("passwordHash", bcrypt.hashSync(value, 10));
  }
  public comparePassword(candidatePassword: string): boolean {
    if (bcrypt.compareSync(candidatePassword, this.passwordHash)) {
      return true;
    } else {
      return false;
    }
  }
}
