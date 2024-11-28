//AccountButtons.js

import React from 'react';
import './AccountButtons.css';

function AccountButtons({ accounts, onAccountClick }) {
  return (
    <div className="accounts-buttons">
      {accounts.map((account) => (
        <button key={account.id} onClick={() => onAccountClick(account.id)}>
          {account.name}
        </button>
      ))}
    </div>
  );
}

export default AccountButtons;
