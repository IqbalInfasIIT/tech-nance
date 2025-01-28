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

  async getTotalIncome(period) {
    const query = 'SELECT SUM(amount) AS total_income FROM transactions WHERE type = "income" AND DATE_FORMAT(date, "%Y-%m") = ?';
    return this.db.promise().query(query, [period]);
  }
  
  async getIncomeBreakdown(period) {
    const query = `
      SELECT ic.category_name, SUM(t.amount) AS total_amount 
      FROM transactions t
      JOIN income_categories ic ON t.destination_id = ic.category_id
      WHERE t.type = "income" AND DATE_FORMAT(t.date, "%Y-%m") = ?
      GROUP BY ic.category_name 
      ORDER BY total_amount DESC 
      LIMIT 4
    `;
    return this.db.promise().query(query, [period]);
  }
  
  async getTotalExpense(period) {
    const query = 'SELECT SUM(amount) AS total_expense FROM transactions WHERE type IN ("expense", "refund") AND DATE_FORMAT(date, "%Y-%m") = ?';
    return this.db.promise().query(query, [period]);
  }
  
  async getExpenseBreakdown(period) {
    const query = `
      SELECT ec.category_name, SUM(t.amount) AS total_amount 
      FROM transactions t
      JOIN expense_categories ec ON t.destination_id = ec.category_id
      WHERE t.type IN ("expense", "refund") AND DATE_FORMAT(t.date, "%Y-%m") = ?
      GROUP BY ec.category_name 
      ORDER BY total_amount DESC 
      LIMIT 4
    `;
    return this.db.promise().query(query, [period]);
  }
  

}

module.exports = Transaction;
