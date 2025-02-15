const CapitalSource = require('../models/CapitalSource');

class SourceController {
  async getAllActiveSources() {
    return CapitalSource.findAll({ where: { is_active: true } });
  }

  async addSource(source) {
    return CapitalSource.create({
      source_type: source.sourceType,
      source_name: source.sourceName,
      balance: source.balance,
      is_bank_account: source.isBankAccount,
      bank_number: source.bankNumber,
    });
  }

  async markSourceInactive(sourceId) {
    await CapitalSource.update({ is_active: false }, { where: { source_id: sourceId } });
    return;
  }  

  async getByIdSource(sourceId) {
    return CapitalSource.findByPk(sourceId);
  }

  async incrementBalanceSource(sourceId, amount) {
    return CapitalSource.increment('balance', { by: amount, where: { source_id: sourceId } });
  }

  async decrementBalanceSource(sourceId, amount) {
    return CapitalSource.decrement('balance', { by: amount, where: { source_id: sourceId } });
  }
}

module.exports = SourceController;
