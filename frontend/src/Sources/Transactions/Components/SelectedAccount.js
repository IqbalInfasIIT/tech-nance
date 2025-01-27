import React from 'react';

function SelectedAccount({ source }) {
  return (
    <div className="selected-account">
      <strong>Selected Account:</strong> {source.source_name}
    </div>
  );
}

export default SelectedAccount;
