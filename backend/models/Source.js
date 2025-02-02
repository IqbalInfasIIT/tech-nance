class Source {
  constructor(db) {
    this.db = db;
  }

  async getAllActive() {
    const query = 'SELECT * FROM capital_sources WHERE is_Active = TRUE';
    return this.db.promise().query(query);
  }

  async add(source) {
    const query = `INSERT INTO capital_sources (source_type, source_name, balance, is_Active, is_bank_account, bank_number) 
                   VALUES (?, ?, ?, TRUE, ?, ?)`;
    const values = [
      source.sourceType,
      source.sourceName, 
      source.balance, 
      source.isBankAccount,
      source.bankNumber
    ];
    return this.db.promise().query(query, values);
  }
  
  async markInactive(sourceId) {
    const query = 'UPDATE capital_sources SET is_Active = FALSE WHERE source_id = ?';
    return this.db.promise().query(query, [sourceId]);
  }

  async getById(sourceId) {
    const query = 'SELECT * FROM capital_sources WHERE source_id = ?';
    return this.db.promise().query(query, [sourceId]);
  }

  async incrementBalance(sourceId, amount) {
    const query = 'UPDATE capital_sources SET balance = balance + ? WHERE source_id = ?';
    const values = [amount, sourceId];
    return this.db.promise().query(query, values);
  }
  
  async decrementBalance(sourceId, amount) {
    const query = 'UPDATE capital_sources SET balance = balance - ? WHERE source_id = ?';
    const values = [amount, sourceId];
    return this.db.promise().query(query, values);
  }
}

module.exports = Source;
