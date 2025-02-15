const { DataTypes } = require('sequelize');
const Sequelize = require('./Sequelize');

const IncomeCategory = Sequelize.define('IncomeCategory', {
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
    tableName: 'income_categories',
    timestamps: false,
});

IncomeCategory.belongsTo(IncomeCategory, { as: 'parentCategory', foreignKey: 'parent_category_id' });
IncomeCategory.hasMany(IncomeCategory, { as: 'subcategories', foreignKey: 'parent_category_id' });

module.exports = IncomeCategory;