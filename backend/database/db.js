const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Inas@3023', // Replace with your actual MySQL root password
  database: 'budget_tracker'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');

  // Create accounts table
  connection.query(`
    CREATE TABLE IF NOT EXISTS accounts (
      account_id INT AUTO_INCREMENT PRIMARY KEY,
      account_name VARCHAR(255) NOT NULL,
      balance DECIMAL(10, 2) NOT NULL
    )`, (err, results) => {
      if (err) throw err;
      console.log('Accounts table ready');
  });

  // Create income categories table
  connection.query(`
    CREATE TABLE IF NOT EXISTS income_categories (
      category_id INT AUTO_INCREMENT PRIMARY KEY,
      category_name VARCHAR(255) NOT NULL
    )`, (err, results) => {
      if (err) throw err;
      console.log('Income categories table ready');
  });

  // Create expense categories table
  connection.query(`
    CREATE TABLE IF NOT EXISTS expense_categories (
      category_id INT AUTO_INCREMENT PRIMARY KEY,
      category_name VARCHAR(255) NOT NULL
    )`, (err, results) => {
      if (err) throw err;
      console.log('Expense categories table ready');
  });

  // Create transactions table
  connection.query(`
    CREATE TABLE IF NOT EXISTS transactions (
      transaction_id INT AUTO_INCREMENT PRIMARY KEY,
      date DATE NOT NULL,
      number VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      type ENUM('transfer', 'income', 'expense', 'refund') NOT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      from_account_id INT DEFAULT NULL,
      to_account_or_category VARCHAR(255) NOT NULL,
      FOREIGN KEY (from_account_id) REFERENCES accounts(account_id)
    )`, (err, results) => {
      if (err) throw err;
      console.log('Transactions table ready');
  });

  console.log('All tables are set up and ready.');
});

module.exports = connection;
