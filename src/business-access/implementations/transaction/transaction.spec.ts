import { mockServices } from "../../../__mocks__/mockServices";

mockServices();

import serviceLocator from "../../../ioc/service-locator";
import TYPES from "../../../ioc/types";
import { ITransactionResourceAccess } from "../../../resource-access/contracts/transaction";
import { ITransactionBusinessAccess } from "../../contracts/transaction";
import { TransactionBusinessAccess } from "./transaction";

describe("TransactionBusinessAccess", () => {
  let transactionBusinessAccess: ITransactionBusinessAccess;
  let transactionResourceAccess: ITransactionResourceAccess;

  beforeEach(() => {
    transactionResourceAccess = serviceLocator.get<ITransactionResourceAccess>(
      TYPES.TransactionResourceAccess,
    );
    transactionBusinessAccess = new TransactionBusinessAccess(
      transactionResourceAccess,
    );
  });

  describe("getTypes()", () => {
    it("should call `transactionResourceAccess.getTypes()`", async () => {
      transactionResourceAccess.getTypes = jest.fn();

      await transactionBusinessAccess.getTypes();

      expect(transactionResourceAccess.getTypes).toHaveBeenCalled();
    });

    it("should returnn `transactionResourceAccess.getTypes()`", async () => {
      const transactionTypes = {
        id: 1,
        name: "something",
      };
      transactionResourceAccess.getTypes = jest
        .fn()
        .mockResolvedValue(transactionTypes);

      const result = await transactionBusinessAccess.getTypes();

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

    it("should call `transactionResourceAccess.create(transaction)`", async () => {
      transactionResourceAccess.create = jest.fn();

      await transactionBusinessAccess.create(transaction);

      expect(transactionResourceAccess.create).toHaveBeenCalledWith(
        transaction,
      );
    });

    it("should return `transactionResourceAccess.create(transaction)`", async () => {
      const newTransaction = Object.assign(transaction, { id: 1 });
      transactionResourceAccess.create = jest
        .fn()
        .mockResolvedValue(newTransaction);

      const result = await transactionBusinessAccess.create(transaction);

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

    it("should call `transactionResourceAccess.addSku(transactionSku)`", async () => {
      transactionResourceAccess.addSku = jest.fn();

      await transactionBusinessAccess.addSku(transactionSku);

      expect(transactionResourceAccess.addSku).toHaveBeenCalledWith(
        transactionSku,
      );
    });

    it("should return `transactionResourceAccess.create(transaction)`", async () => {
      const newTransactionSku = Object.assign(transactionSku, { id: 1 });
      transactionResourceAccess.addSku = jest
        .fn()
        .mockResolvedValue(newTransactionSku);

      const result = await transactionBusinessAccess.addSku(transactionSku);

      expect(result).toBe(newTransactionSku);
    });
  });
});
