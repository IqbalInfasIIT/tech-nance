const Transaction = require('../models/Transaction');
const CapitalSource = require('../models/CapitalSource');
const IncomeCategory = require('../models/IncomeCategory');
const ExpenseCategory = require('../models/ExpenseCategory');
const { Op } = require('sequelize');
const moment = require('moment');
const sequelize = require('../models/Sequelize');

class TransactionController {
    async getAllTransactions() {
        return Transaction.findAll();
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

    async getAllTransactionsWithNames(startDate, endDate) {
      const formattedStartDate = `${startDate} 00:00:00`;
      const formattedEndDate = `${endDate} 23:59:59`;
  
      const query = `
          SELECT 
              t.transaction_id,
              DATE(t.date) AS date,
              t.number,
              t.description,
              t.type,
              COALESCE(cs.source_name, ic.category_name, ec.category_name) AS source_name,
              COALESCE(cs2.source_name, ic2.category_name, ec2.category_name) AS destination_name,
              t.amount,
              t.source_type,
              t.destination_type
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
          WHERE 
              t.date BETWEEN :startDate AND :endDate
          ORDER BY 
              t.date DESC;
      `;
  
      const transactions = await sequelize.query(query, {
          replacements: { startDate: formattedStartDate, endDate: formattedEndDate },
          type: sequelize.QueryTypes.SELECT
      });
  
      return transactions;
  }

  async getTransactionDateRange() {
        const earliestDate = await Transaction.min('date');
        const latestDate = await Transaction.max('date');

        return {
            earliestDate: earliestDate ? moment(earliestDate).format('YYYY-MM-DD') : null,
            latestDate: latestDate ? moment(latestDate).format('YYYY-MM-DD') : null
        };
    }
}

module.exports = TransactionController;
