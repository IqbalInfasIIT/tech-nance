const { DataTypes } = require('sequelize');
const Sequelize = require('./Sequelize');

const ExpenseCategory = Sequelize.define('ExpenseCategory', {
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    category_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    parent_category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'expense_categories',
    timestamps: false,
});

ExpenseCategory.belongsTo(ExpenseCategory, { as: 'parentCategory', foreignKey: 'parent_category_id' });
ExpenseCategory.hasMany(ExpenseCategory, { as: 'subcategories', foreignKey: 'parent_category_id' });

module.exports = ExpenseCategory;

