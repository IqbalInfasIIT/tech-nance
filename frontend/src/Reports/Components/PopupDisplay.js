import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './PopupDisplay.css';

const PopupDisplay = ({ show, handleClose, title, breakdown = [] }) => {
  return (
    <Popup open={show} onClose={handleClose} className="popup-modal">
      <div className="pp-modal">
        <button className="pp-close" onClick={handleClose}>&times;</button>

        <div className="pp-header">{title}</div>

        <div className="pp-content">
          {breakdown.length > 0 ? (
            <table className="pp-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {breakdown
                  .filter(item => parseFloat(item.total) > 0)
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.category_name}</td>
                      <td>{parseFloat(item.total).toLocaleString(undefined, { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 2 
                      })}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p className="pp-empty-message">No data available.</p>
          )}
        </div>

        {/* Footer/Close Button */}
        <div className="pp-actions">
          <button className="pp-button" onClick={handleClose}>Close</button>
        </div>
      </div>
    </Popup>
  );
};

export default PopupDisplay;
