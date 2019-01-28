import { TransactionType } from "../../models/transaction-type";

export interface ITransactionResourceAccess {
  getTypes(): Promise<TransactionType[]>;
}
