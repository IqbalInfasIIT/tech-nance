// backend/services/sourceService.js
const Source = require('../models/Source');

class SourceService {
  constructor() {
    this.sourceModel = Source;
  }

  async getAllActiveSources() {
    const sources = await this.sourceModel.getAllActive();
    return sources.map(source => source.dataValues);
  }

  async addSource(source) {
    return this.sourceModel.create(source);
  }

  async markSourceInactive(sourceId) {
    return this.sourceModel.update(
      { is_Active: false },
      { where: { source_id: sourceId } }
    );
  }

  async getByIdSource(sourceId) {
    const source = await this.sourceModel.findByPk(sourceId);
    return source ? source.dataValues : null;
  }

  async incrementBalanceSource(sourceId, amount) {
    const source = await this.sourceModel.findByPk(sourceId);
    if (source) {
      source.balance = parseFloat(source.balance) + parseFloat(amount);
      await source.save();
      return source.dataValues;
    }
    throw new Error('Source not found');
  }

  async decrementBalanceSource(sourceId, amount) {
    const source = await this.sourceModel.findByPk(sourceId);
    if (source) {
      source.balance = parseFloat(source.balance) - parseFloat(amount);
      await source.save();
      return source.dataValues;
    }
    throw new Error('Source not found');
  }
}

module.exports = new SourceService();
