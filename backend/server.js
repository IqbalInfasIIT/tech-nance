const express = require('express');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes');
const accountRoutes = require('./routes/accountRoutes');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Use specific base paths for routes
app.use('/transactions', transactionRoutes);
app.use('/accounts', accountRoutes);

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
