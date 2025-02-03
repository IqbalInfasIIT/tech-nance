class TransactionService {
  constructor(transactionModel, sourceModel) {
    this.transactionModel = transactionModel;
    this.sourceModel = sourceModel;
  }

  async getAllTransactions() {
    return this.transactionModel.getAll();
  }

  async getAllTransactionsWithNames() {
    return this.transactionModel.getAllWithNames();
  }

  async addTransaction(transaction) {
    const defaultValues = {
      date: new Date().toISOString().split('T')[0],
      number: 'N/A',
      description: 'No description provided',
      type: 'transfer',
      amount: '0.00',
      sourceId: '0',
      sourceType: 'source',
      destinationId: null,
      destinationType: null,
      paymentMethod: 'Cash'
    };

    const finalTransaction = { ...defaultValues, ...transaction };
    await this.transactionModel.add(finalTransaction);

    switch (finalTransaction.type) {
      case 'transfer':
        await this.sourceModel.decrementBalance(finalTransaction.sourceId, finalTransaction.amount);
        await this.sourceModel.incrementBalance(finalTransaction.destinationId, finalTransaction.amount);
        break;
      case 'income':
        await this.sourceModel.incrementBalance(finalTransaction.destinationId, finalTransaction.amount);
        break;
      case 'expense':
        await this.sourceModel.decrementBalance(finalTransaction.sourceId, finalTransaction.amount);
        break;
      case 'refund':
        await this.sourceModel.incrementBalance(finalTransaction.destinationId, finalTransaction.amount);
        break;
      default:
        break;
    }
  }

  async deleteTransaction(transactionId) {
    const [transactionResult] = await this.transactionModel.getById(transactionId);
    if (transactionResult.length === 0) {
      throw new Error('Transaction not found');
    }
    const transaction = transactionResult[0];
    await this.transactionModel.delete(transactionId);

    switch (transaction.type) {
      case 'transfer':
        await this.sourceModel.incrementBalance(transaction.sourceId, transaction.amount);
        await this.sourceModel.decrementBalance(transaction.destinationId, transaction.amount);
        break;
      case 'income':
        await this.sourceModel.decrementBalance(transaction.sourceId, transaction.amount);
        break;
      case 'expense':
        await this.sourceModel.incrementBalance(transaction.sourceId, transaction.amount);
        break;
      case 'refund':
        await this.sourceModel.decrementBalance(transaction.sourceId, transaction.amount);
        break;
      default:
        break;
    }
  }

  async getTransactionById(transactionId) {
    return this.transactionModel.getById(transactionId);
  }

  async getIncomeBreakdown(period) {
    return this.transactionModel.getIncomeBreakdown(period);
  }

  async getExpenseBreakdown(period) {
    return this.transactionModel.getExpenseBreakdown(period);
  }

  async getMonthlyTotals() {
    return this.transactionModel.getMonthlyTotals();
  }
}

module.exports = TransactionService;
