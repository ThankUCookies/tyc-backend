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
  public name: string;
}
