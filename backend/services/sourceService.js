class SourceService {
  constructor(sourceModel) {
    this.sourceModel = sourceModel;
  }

  async getAllActiveSources() {
    return this.sourceModel.getAllActive();
  }

  async getBankAccounts() {
    return this.sourceModel.getBankAccounts();
  }

  async getDigitalWallets() {
    return this.sourceModel.getDigitalWallets();
  }

  async getCreditCards() {
    return this.sourceModel.getCreditCards();
  }

  async getCards() {
    return this.sourceModel.getCards();
  }

  async getGifts() {
    return this.sourceModel.getGifts();
  }

  async addSource(source) {
    return this.sourceModel.add(source);
  }

  async markSourceInactive(sourceId) {
    return this.sourceModel.markInactive(sourceId);
  }

  async getSourceById(sourceId) {
    return this.sourceModel.getSourceById(sourceId);
  }

  async incrementBalance(sourceId, amount) {
    return this.sourceModel.incrementBalance(sourceId, amount);
  }

  async decrementBalance(sourceId, amount) {
    return this.sourceModel.decrementBalance(sourceId, amount);
  }
}

module.exports = SourceService;
