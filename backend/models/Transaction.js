const { DataTypes } = require('sequelize');
const Sequelize = require('./Sequelize');
const CapitalSource = require('./CapitalSource');
const IncomeCategory = require('./IncomeCategory');
const ExpenseCategory = require('./ExpenseCategory');

const Transaction = Sequelize.define('Transaction', {
    transaction_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    number: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('transfer', 'income', 'expense', 'refund'),
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    source_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    source_type: {
        type: DataTypes.ENUM('source', 'income_category', 'expense_category'),
        allowNull: false,
    },
    destination_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    destination_type: {
        type: DataTypes.ENUM('source', 'income_category', 'expense_category'),
        allowNull: true,
    },
    payment_method: {
        type: DataTypes.ENUM('Transfer', 'Cash'),
        allowNull: true,
    },
}, {
    tableName: 'transactions',
    timestamps: false,
});

Transaction.belongsTo(CapitalSource, { foreignKey: 'source_id', as: 'source', constraints: false });
Transaction.belongsTo(IncomeCategory, { foreignKey: 'source_id', as: 'incomeSource', constraints: false });
Transaction.belongsTo(ExpenseCategory, { foreignKey: 'source_id', as: 'expenseSource', constraints: false });

Transaction.belongsTo(CapitalSource, { foreignKey: 'destination_id', as: 'destination', constraints: false });
Transaction.belongsTo(IncomeCategory, { foreignKey: 'destination_id', as: 'incomeDestination', constraints: false });
Transaction.belongsTo(ExpenseCategory, { foreignKey: 'destination_id', as: 'expenseDestination', constraints: false });


module.exports = Transaction;
