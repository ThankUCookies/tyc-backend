import { Transaction } from "../../../models/transaction";
import { TransactionSku } from "../../../models/transaction-sku";
import { TransactionType } from "../../../models/transaction-type";
import { ITransactionResourceAccess } from "../../contracts/transaction";
import { TransactionResourceAccess } from "./transaction";

describe("TransactionResourceAccess", () => {
  let transactionResourceAccess: ITransactionResourceAccess;

  beforeEach(() => {
    transactionResourceAccess = new TransactionResourceAccess();
  });

  describe("getTypes()", () => {
    it("should call `TransactionType.findAll()`", async () => {
      TransactionType.findAll = jest.fn();

      await transactionResourceAccess.getTypes();

      expect(TransactionType.findAll).toHaveBeenCalled();
    });

    it("should return `TransactionType.findAll()`", async () => {
      const transactionTypes = [
        {
          id: 1,
          name: "something",
        },
      ];
      TransactionType.findAll = jest.fn().mockResolvedValue(transactionTypes);

      const result = await transactionResourceAccess.getTypes();

      expect(result).toBe(transactionTypes);
    });
  });

  describe("create()", () => {
    let transaction: object;

    beforeEach(() => {
      transaction = {
        typeId: 1,
      };
    });

    it("should call `Transaction.create(transaction)`", async () => {
      Transaction.create = jest.fn();

      await transactionResourceAccess.create(transaction);

      expect(Transaction.create).toHaveBeenCalledWith(transaction);
    });

    it("should return `Transaction.create()`", async () => {
      const newTransaction = Object.assign(transaction, { id: 1 });

      Transaction.create = jest.fn().mockResolvedValue(newTransaction);

      const result = await transactionResourceAccess.create(transaction);

      expect(result).toBe(newTransaction);
    });
  });

  describe("addSku()", () => {
    let transactionSku: object;

    beforeEach(() => {
      transactionSku = {
        skuCode: "something",
      };
    });

    it("should call `TransactionSku.addSku(transactionSku)`", async () => {
      TransactionSku.create = jest.fn();

      await transactionResourceAccess.addSku(transactionSku);

      expect(TransactionSku.create).toHaveBeenCalledWith(transactionSku);
    });

    it("should return `TransactionSku.addSku(transactionSku)`", async () => {
      const newTransactionSku = Object.assign(transactionSku, { id: 1 });

      TransactionSku.create = jest.fn().mockResolvedValue(newTransactionSku);

      const result = await transactionResourceAccess.addSku(transactionSku);

      expect(result).toBe(newTransactionSku);
    });
  });
});
