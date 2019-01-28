import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "transaction-type",
  timestamps: true,
})
export class TransactionType extends Model<TransactionType> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id: number;
  @Column
  public name: string;
}
