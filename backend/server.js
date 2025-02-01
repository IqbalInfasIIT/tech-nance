const express = require('express');
const cors = require('cors');
const sourceRoutes = require('./routes/sourceRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

app.use('/sources', sourceRoutes);
app.use('/transactions', transactionRoutes);
app.use('/categories', categoryRoutes);

app.use((err, res) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
