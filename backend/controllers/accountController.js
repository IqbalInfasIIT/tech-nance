const db = require('../database/db');

exports.addAccount = (req, res) => {
  const { name, balance } = req.body;
  db.query(
    'INSERT INTO accounts (account_name, balance) VALUES (?, ?)',
    [name, balance],
    function(err, results) {
      if (err) {
        return res.status(500).send('Error adding account');
      }
      res.status(200).send('Account added successfully');
    }
  );
};

exports.getAccounts = (req, res) => {
  db.query(
    'SELECT * FROM accounts',
    (err, results) => {
      if (err) {
        return res.status(500).send('Error retrieving accounts');
      }
      res.json(results);
    }
  );
};

exports.deleteAccount = (req, res) => {
  const { accountId } = req.params;
  db.query(
    'DELETE FROM accounts WHERE account_id = ?',
    [accountId],
    function(err, results) {
      if (err) {
        return res.status(500).send('Error deleting account');
      }
      res.status(200).send('Account deleted successfully');
    }
  );
};
