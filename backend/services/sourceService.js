class SourceService {
  constructor(sourceModel) {
    this.sourceModel = sourceModel;
  }

  async getAllActiveSources() {
    return this.sourceModel.getAllActive();
  }

  async addSource(source) {
    return this.sourceModel.add(source);
  }

  async markSourceInactive(sourceId) {
    return this.sourceModel.markInactive(sourceId);
  }

  async getByIdSource(sourceId) {
    return this.sourceModel.getById(sourceId);
  }

  async incrementBalanceSource(sourceId, amount) {
    return this.sourceModel.incrementBalance(sourceId, amount);
  }

  async decrementBalanceSource(sourceId, amount) {
    return this.sourceModel.decrementBalance(sourceId, amount);
  }
}

module.exports = SourceService;
