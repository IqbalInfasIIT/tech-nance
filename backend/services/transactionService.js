const Transaction = require('../models/Transaction');
const Source = require('../models/Source');

class TransactionService {
  async getAllTransactions() {
    return Transaction.getAll();
  }

  async getAllTransactionsWithNames() {
    return Transaction.getAllWithNames();
  }  

  async addTransaction(transaction) {
    const defaultValues = {
      date: new Date().toISOString().split('T')[0],
      number: 'N/A',
      description: 'No description provided',
      type: 'transfer',
      amount: '0.00',
      source_id: '0',
      source_type: 'source',
      destination_id: null,
      destination_type: null,
      payment_method: 'Cash'
    };

    const finalTransaction = { ...defaultValues, ...transaction };
    
    await Transaction.add(finalTransaction);

    const sourceModel = new Source();
    switch (finalTransaction.type) {
      case 'transfer':
        await sourceModel.decrementBalance(finalTransaction.source_id, finalTransaction.amount);
        await sourceModel.incrementBalance(finalTransaction.destination_id, finalTransaction.amount);
        break;
      case 'income':
        await sourceModel.incrementBalance(finalTransaction.source_id, finalTransaction.amount);
        break;
      case 'expense':
        await sourceModel.decrementBalance(finalTransaction.source_id, finalTransaction.amount);
        break;
      case 'refund':
        await sourceModel.incrementBalance(finalTransaction.source_id, finalTransaction.amount);
        break;
      default:
        break;
    }

    return finalTransaction;
  }

  async deleteTransaction(transactionId) {
    const transactionResult = await Transaction.getById(transactionId);
    if (!transactionResult) {
      throw new Error('Transaction not found');
    }
    const transaction = transactionResult.dataValues;

    await Transaction.delete(transactionId);

    const sourceModel = new Source();
    switch (transaction.type) {
      case 'transfer':
        await sourceModel.incrementBalance(transaction.source_id, transaction.amount);
        await sourceModel.decrementBalance(transaction.destination_id, transaction.amount);
        break;
      case 'income':
        await sourceModel.decrementBalance(transaction.source_id, transaction.amount);
        break;
      case 'expense':
        await sourceModel.incrementBalance(transaction.source_id, transaction.amount);
        break;
      case 'refund':
        await sourceModel.decrementBalance(transaction.source_id, transaction.amount);
        break;
      default:
        break;
    }

    return transaction;
  }

  async getTransactionById(transactionId) {
    return Transaction.getById(transactionId);
  }

  async getIncomeBreakdown(period) {
    return Transaction.getIncomeBreakdown(period);
  }

  async getExpenseBreakdown(period) {
    return Transaction.getExpenseBreakdown(period);
  }

  async getMonthlyTotals() {
    return Transaction.getMonthlyTotals();
  }
}

module.exports = new TransactionService();
