class Transaction {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    const query = 'SELECT * FROM transactions';
    return this.db.promise().query(query);
  }

  async add(transaction) {
    const query = `INSERT INTO transactions (date, number, description, type, amount, source_id, source_type, destination_id, destination_type, payment_method) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      transaction.date,
      transaction.number,
      transaction.description,
      transaction.type,
      transaction.amount,
      transaction.sourceId,
      transaction.sourceType,
      transaction.destinationId,
      transaction.destinationType,
      transaction.paymentMethod
    ];
    return this.db.promise().query(query, values);
  }

  async getById(transactionId) {
    const query = 'SELECT * FROM transactions WHERE transaction_id = ?';
    return this.db.promise().query(query, [transactionId]);
  }

  async delete(transactionId) {
    const query = 'DELETE FROM transactions WHERE transaction_id = ?';
    return this.db.promise().query(query, [transactionId]);
  }
}

module.exports = Transaction;
