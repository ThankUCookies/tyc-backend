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
  return db.createTable('transactions', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, unsigned: true },
    dateTime: { type: 'timestamp', notNull: true },
    typeId: {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: 'transactions_transaction_type_fk',
        table: 'transaction-type',
        rules: {
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE'
        },
        mapping: 'id'
      }
    },
    eventId: {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: 'transactions_events_fk',
        table: 'events',
        rules: {
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE'
        },
        mapping: 'id'
      }
    },
    userId: {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: 'transactions_users_fk',
        table: 'users',
        rules: {
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE'
        },
        mapping: 'id'
      }
    }
  });
};

exports.down = function(db) {
  return db.dropTable('transactions');
};

exports._meta = {
  version: 1
};
