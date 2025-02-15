const Transaction = require('../models/Transaction');
const CapitalSource = require('../models/CapitalSource');
const IncomeCategory = require('../models/IncomeCategory');
const ExpenseCategory = require('../models/ExpenseCategory');
const Sequelize = require('../models/Sequelize');

class TransactionController {
    async getAllTransactions() {
        return Transaction.findAll();
    }

    async getAllTransactionsWithNames() {
        return Transaction.findAll({
            include: [
                { model: CapitalSource, as: 'source', attributes: ['source_name'], required: false },
                { model: IncomeCategory, as: 'incomeSource', attributes: ['category_name'], required: false },
                { model: ExpenseCategory, as: 'expenseSource', attributes: ['category_name'], required: false },
                { model: CapitalSource, as: 'destination', attributes: ['source_name'], required: false },
                { model: IncomeCategory, as: 'incomeDestination', attributes: ['category_name'], required: false },
                { model: ExpenseCategory, as: 'expenseDestination', attributes: ['category_name'], required: false },
            ],
            order: [['date', 'DESC']],
        });
    }

    async addTransaction(transaction, t) {
        return Transaction.create(transaction, { transaction: t });
    }

    async deleteTransaction(transactionId, t) {
        return Transaction.destroy({ where: { transaction_id: transactionId }, transaction: t });
    }

    async getTransactionById(transactionId) {
        return Transaction.findByPk(transactionId, {
            include: [
                { model: CapitalSource, as: 'source', attributes: ['source_name'], required: false },
                { model: IncomeCategory, as: 'incomeSource', attributes: ['category_name'], required: false },
                { model: ExpenseCategory, as: 'expenseSource', attributes: ['category_name'], required: false },
                { model: CapitalSource, as: 'destination', attributes: ['source_name'], required: false },
                { model: IncomeCategory, as: 'incomeDestination', attributes: ['category_name'], required: false },
                { model: ExpenseCategory, as: 'expenseDestination', attributes: ['category_name'], required: false },
            ],
        });
    }

    async getIncomeBreakdown(period) {
      return Transaction.findAll({
          attributes: [
              [Sequelize.col('incomeSource.parentCategory.category_name'), 'parent_category_name'],
              [Sequelize.fn('SUM', Sequelize.col('amount')), 'total_amount'],
          ],
          include: [
              {
                  model: IncomeCategory,
                  as: 'incomeSource',
                  attributes: [],
                  required: true,
                  include: [
                      {
                          model: IncomeCategory,
                          as: 'parentCategory',
                          attributes: [],
                          required: true,
                      },
                  ],
              },
          ],
          where: Sequelize.literal(`DATE_FORMAT(date, "%Y-%m") = '${period}' AND type = 'income'`), // Correct where clause
          group: [Sequelize.col('incomeSource.parentCategory.category_name')],
          order: [[Sequelize.fn('SUM', Sequelize.col('amount')), 'DESC']],
          raw: true,
      });
  }
  
  async getExpenseBreakdown(period) {
      return Transaction.findAll({
          attributes: [
              [Sequelize.col('expenseDestination.parentCategory.category_name'), 'parent_category_name'],
              [Sequelize.fn('SUM', Sequelize.col('amount')), 'total_amount'],
          ],
          include: [
              {
                  model: ExpenseCategory,
                  as: 'expenseDestination',
                  attributes: [],
                  required: true,
                  include: [
                      {
                          model: ExpenseCategory,
                          as: 'parentCategory',
                          attributes: [],
                          required: true,
                      },
                  ],
              },
          ],
          where: Sequelize.literal(`DATE_FORMAT(date, "%Y-%m") = '${period}' AND type = 'expense'`), // Correct where clause
          group: [Sequelize.col('expenseDestination.parentCategory.category_name')],
          order: [[Sequelize.fn('SUM', Sequelize.col('amount')), 'DESC']],
          raw: true,
      });
  }

    async getMonthlyTotals() {
        return Transaction.sequelize.query(`
            SELECT year, month, total_income, total_expenses
            FROM monthly_totals
            ORDER BY year ASC, month ASC
            LIMIT 12;
        `, { type: Sequelize.QueryTypes.SELECT });
    }
}

module.exports = TransactionController;