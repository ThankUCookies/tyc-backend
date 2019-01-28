import { TransactionType } from "../../models/transaction-type";

export interface ITransactionBusinessAccess {
  getTypes(): Promise<TransactionType[]>;
}
