import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './PopupDisplay.css';

const PopupDisplay = ({ show, handleClose, title, breakdown = [] }) => {
  return (
    <Popup open={show} onClose={handleClose}>
      <div className="pp-modal">
        <button className="pp-close" onClick={handleClose}>&times;</button>
        <div className="pp-header">{title}</div>
        <div className="pp-content">
          <table className="pp-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {breakdown
                .filter(item => parseFloat(item.total_amount) > 0)
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.main_category_name}</td>
                    <td>{parseFloat(item.total_amount).toFixed(2)}</td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pp-actions">
          <button className="pp-button" onClick={handleClose}>Close</button>
        </div>
      </div>
    </Popup>
  );
};

export default PopupDisplay;
