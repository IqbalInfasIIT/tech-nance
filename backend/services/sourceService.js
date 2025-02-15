const SourceController = require('../controllers/sourceController');
const sourceController = new SourceController();

class SourceService {
  async getAllActiveSources() {
    return sourceController.getAllActiveSources();
  }

  async addSource(source) {
    return sourceController.addSource(source);
  }

  async markSourceInactive(sourceId) {
    return sourceController.markSourceInactive(sourceId);
  }

  async getByIdSource(sourceId) {
    return sourceController.getByIdSource(sourceId);
  }

  async incrementBalanceSource(sourceId, amount) {
    return sourceController.incrementBalanceSource(sourceId, amount);
  }

  async decrementBalanceSource(sourceId, amount) {
    return sourceController.decrementBalanceSource(sourceId, amount);
  }
}

module.exports = SourceService;
