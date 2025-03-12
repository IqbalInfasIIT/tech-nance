const TransactionController = require('../controllers/transactionController');
const CapitalSource = require('../models/CapitalSource');
const IncomeCategory = require('../models/IncomeCategory');
const ExpenseCategory = require('../models/ExpenseCategory');
const Sequelize = require('../models/Sequelize');

const transactionController = new TransactionController();

class TransactionService {
    async getAllTransactions() {
        return transactionController.getAllTransactions();
    }

    async getAllTransactionsWithNames(startDate, endDate) {
        return transactionController.getAllTransactionsWithNames(startDate, endDate);
    }

    async addTransaction(transaction) {
        console.log(transaction)
        const defaultValues = {
            date: new Date().toISOString().split('T')[0],
            number: 'N/A',
            description: 'No description provided',
            type: 'transfer',
            amount: '0.00',
            source_id: null,
            source_type: 'source',
            destination_id: null,
            destination_type: null,
            paymentMethod: 'Cash',
        };

        const finalTransaction = { ...defaultValues, ...transaction };

        return Sequelize.transaction(async (t) => {
            const createdTransaction = await transactionController.addTransaction(finalTransaction, t);
            return createdTransaction;
        });
    }

    async deleteTransaction(transactionId) {
        return Sequelize.transaction(async (t) => {
            const transaction = await transactionController.getTransactionById(transactionId);
            console.log(transaction)
            if (!transaction) {
                throw new Error('Transaction not found');
            }
            await transactionController.deleteTransaction(transactionId, t);
        });
    }

    async getTransactionById(transactionId) {
        return transactionController.getTransactionById(transactionId);
    }

    async getTransactionByIdPlus(transactionId) {
        return transactionController.getTransactionByIdPlus(transactionId);
    }

    async getTransactionDateRange() {
        return transactionController.getTransactionDateRange();
    }
      
}

module.exports = TransactionService;
