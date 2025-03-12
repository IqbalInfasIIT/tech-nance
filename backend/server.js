const express = require('express');
const cors = require('cors');
const sequelize = require('./models/Sequelize');

const sourceRoutes = require('./routes/sourceRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const monthlyTotalRoutes = require('./routes/monthlyTotalRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const monthlyCategoryTotalRoutes = require('./routes/monthlyCategoryTotalRoutes');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('Welcome to the backend server!'));

app.use('/capital-sources', sourceRoutes);
app.use('/transactions', transactionRoutes);
app.use('/categories', categoryRoutes);
app.use('/monthly-totals', monthlyTotalRoutes);
app.use('/budgets', budgetRoutes);
app.use('/monthly-category-totals', monthlyCategoryTotalRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('✅ Database & tables are synced!');
    app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
  } catch (error) {
    console.error('❌ Database sync failed:', error);
  }
})();
