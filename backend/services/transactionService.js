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
}

module.exports = TransactionService;
