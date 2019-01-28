import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "transaction-skus",
  timestamps: true,
})
export class TransactionSku extends Model<TransactionSku> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id: number;
  @Column
  public transactionId: number;
  @Column
  public skuCode: number;
}
