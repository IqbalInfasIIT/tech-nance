class TransactionService {
  constructor(transactionModel) {
    this.transactionModel = transactionModel;
  }

  async getAllTransactions() {
    return this.transactionModel.getAll();
  }

  async addTransaction(transaction) {
    return this.transactionModel.add(transaction);
  }

  async getTransactionById(transactionId) {
    return this.transactionModel.getById(transactionId);
  }

  async deleteTransaction(transactionId) {
    return this.transactionModel.delete(transactionId);
  }

  async getTotalIncome(period) {
    return this.transactionModel.getTotalIncome(period);
  }

  async getIncomeBreakdown(period) {
    return this.transactionModel.getIncomeBreakdown(period);
  }

  async getTotalExpense(period) {
    return this.transactionModel.getTotalExpense(period);
  }

  async getExpenseBreakdown(period) {
    return this.transactionModel.getExpenseBreakdown(period);
  }
}

module.exports = TransactionService;
