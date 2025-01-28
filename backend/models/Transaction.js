class Transaction {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    const query = 'SELECT * FROM transactions';
    return this.db.promise().query(query);
  }

  async getAllWithNames() {
    const query = `
      SELECT 
          t.transaction_id,
          DATE(t.date) AS date,  -- Extract only the date part
          t.number,
          t.description,
          t.type,
          COALESCE(cs.source_name, ic.category_name, ec.category_name) AS source_name,
          COALESCE(cs2.source_name, ic2.category_name, ec2.category_name) AS destination_name,
          t.amount
      FROM 
          transactions t
      LEFT JOIN 
          capital_sources cs ON t.source_id = cs.source_id AND t.source_type = 'source'
      LEFT JOIN 
          income_categories ic ON t.source_id = ic.category_id AND t.source_type = 'income_category'
      LEFT JOIN 
          expense_categories ec ON t.source_id = ec.category_id AND t.source_type = 'expense_category'
      LEFT JOIN 
          capital_sources cs2 ON t.destination_id = cs2.source_id AND t.destination_type = 'source'
      LEFT JOIN 
          income_categories ic2 ON t.destination_id = ic2.category_id AND t.destination_type = 'income_category'
      LEFT JOIN 
          expense_categories ec2 ON t.destination_id = ec2.category_id AND t.destination_type = 'expense_category'
      ORDER BY 
          t.date DESC;
    `;
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

  async delete(transactionId) {
    const query = 'DELETE FROM transactions WHERE transaction_id = ?';
    return this.db.promise().query(query, [transactionId]);
  }

  async getById(transactionId) {
    const query = 'SELECT * FROM transactions WHERE transaction_id = ?';
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

  async getMonthlyTotals() {
    const query = `
      SELECT year, month, total_income, total_expenses
      FROM monthly_totals
      ORDER BY year ASC, month ASC
      LIMIT 12;
    `;
    return this.db.promise().query(query);
  }
  
}

module.exports = Transaction;
