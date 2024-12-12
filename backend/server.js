const express = require('express');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

app.use('/', transactionRoutes);

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
