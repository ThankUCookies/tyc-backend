'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('transaction-skus', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, unsigned: true },
    transactionId: {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: 'transaction_skus_transactions_fk',
        table: 'transactions',
        rules: {
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE'
        },
        mapping: 'id'
      }
    },
    skuCode: {
      type: 'int',
      unsigned: true,
      notNull: true
    }
  });
};

exports.down = function(db) {
  return db.dropTable('transaction-skus');
};

exports._meta = {
  version: 1
};
