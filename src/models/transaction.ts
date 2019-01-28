import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "transactions",
  timestamps: true,
})
export class Transaction extends Model<Transaction> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id: number;
  @Column
  public typeId: number;
  @Column
  public dateTime: Date;
  @Column
  public eventId: number;
  @Column
  public userId: number;
}
