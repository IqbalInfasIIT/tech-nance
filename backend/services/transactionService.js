class TransactionService {
  constructor(transactionModel) {
    this.transactionModel = transactionModel;
  }

  async getAllTransactions() {
    return this.transactionModel.getAll();
  }

  async getAllTransactionsWithNames() {
    return this.transactionModel.getAllWithNames();
  }  

  async addTransaction(transaction) {
    return this.transactionModel.add(transaction);
  }

  async deleteTransaction(transactionId) {
    return this.transactionModel.delete(transactionId);
  }

  async getTransactionById(transactionId) {
    return this.transactionModel.getById(transactionId);
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

  async getMonthlyTotals() {
    return this.transactionModel.getMonthlyTotals();
  }

}

module.exports = TransactionService;
