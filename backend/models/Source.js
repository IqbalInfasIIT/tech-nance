class Source {
  constructor(db) {
    this.db = db;
  }

  async getAllActive() {
    const query = 'SELECT * FROM capital_sources WHERE isActive = TRUE';
    return this.db.promise().query(query);
  }

  async getBankAccounts() {
    const query = 'SELECT * FROM capital_sources WHERE is_bank_account = TRUE AND isActive = TRUE';
    return this.db.promise().query(query);
  }

  async add(source) {
    const query = `INSERT INTO capital_sources (source_type, source_name, balance, linked_account_id, credit_limit, cycle_end_date, is_bank_account, isActive) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, TRUE)`;
    const values = [source.sourceType, source.sourceName, source.balance, source.linkedAccountId, source.creditLimit, source.cycleEndDate, source.isBankAccount];
    return this.db.promise().query(query, values);
  }

  async markInactive(sourceId) {
    const query = 'UPDATE capital_sources SET isActive = FALSE WHERE source_id = ?';
    return this.db.promise().query(query, [sourceId]);
  }

  async getSourceById(sourceId) {
    const query = 'SELECT * FROM capital_sources WHERE source_id = ?';
    return this.db.promise().query(query, [sourceId]);
  }

  async getDigitalWallets() {
    const query = 'SELECT * FROM capital_sources WHERE source_type = "Digital" AND isActive = TRUE';
    return this.db.promise().query(query);
  }

  async getCards() {
    const query = 'SELECT * FROM capital_sources WHERE source_type = "Card" AND isActive = TRUE';
    return this.db.promise().query(query);
  }

  async getCreditCards() {
    const query = 'SELECT * FROM capital_sources WHERE source_type = "Card" AND isActive = TRUE AND cycle_end_date IS NOT NULL';
    return this.db.promise().query(query);
  }

  async getGifts() {
    const query = 'SELECT * FROM capital_sources WHERE source_type = "Gift" AND isActive = TRUE';
    return this.db.promise().query(query);
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
