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

    async getAllTransactionsWithNames() {
        return transactionController.getAllTransactionsWithNames();
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
        console.log(finalTransaction,"bitch")

        return Sequelize.transaction(async (t) => {
            const createdTransaction = await transactionController.addTransaction(finalTransaction, t);

            const amount = parseFloat(finalTransaction.amount);

            switch (finalTransaction.type) {
                case 'transfer':
                    await CapitalSource.increment('balance', { by: amount, where: { source_id: finalTransaction.source_id }, transaction: t });
                    await CapitalSource.decrement('balance', { by: amount, where: { source_id: finalTransaction.destination_id }, transaction: t });
                    break;
                case 'income':
                    if (finalTransaction.destination_type === 'source') {
                        await CapitalSource.increment('balance', { by: amount, where: { source_id: finalTransaction.destination_id }, transaction: t });
                    }
                    break;
                case 'expense':
                    if (finalTransaction.source_type === 'source') {
                        await CapitalSource.decrement('balance', { by: amount, where: { source_id: finalTransaction.source_id }, transaction: t });
                    }
                    break;
                case 'refund':
                    if (finalTransaction.destination_type === 'source') {
                        await CapitalSource.increment('balance', { by: amount, where: { source_id: finalTransaction.destination_id }, transaction: t });
                    }
                    break;
                default:
                    break;
            }

            return createdTransaction;
        });
    }

    async deleteTransaction(transactionId) {
        return Sequelize.transaction(async (t) => {
            const transaction = await transactionController.getTransactionById(transactionId);
            if (!transaction) {
                throw new Error('Transaction not found');
            }

            const amount = parseFloat(transaction.amount);

            await transactionController.deleteTransaction(transactionId, t);

            switch (transaction.type) {
                case 'transfer':
                    await CapitalSource.increment('balance', { by: amount, where: { source_id: transaction.source_id }, transaction: t });
                    await CapitalSource.decrement('balance', { by: amount, where: { source_id: transaction.destination_id }, transaction: t });
                    break;
                case 'income':
                    if (transaction.source_type === 'source') {
                        await CapitalSource.decrement('balance', { by: amount, where: { source_id: transaction.source_id }, transaction: t });
                    }
                    break;
                case 'expense':
                    if (transaction.source_type === 'source') {
                        await CapitalSource.increment('balance', { by: amount, where: { source_id: transaction.source_id }, transaction: t });
                    }
                    break;
                case 'refund':
                    if (transaction.source_type === 'source') {
                        await CapitalSource.decrement('balance', { by: amount, where: { source_id: transaction.source_id }, transaction: t });
                    }
                    break;
                default:
                    break;
            }
        });
    }

    async getTransactionById(transactionId) {
        return transactionController.getTransactionById(transactionId);
    }

    async getIncomeBreakdown(period) {
        return transactionController.getIncomeBreakdown(period);
    }

    async getExpenseBreakdown(period) {
        return transactionController.getExpenseBreakdown(period);
    }

    async getMonthlyTotals() {
        return transactionController.getMonthlyTotals();
    }
}

module.exports = TransactionService;