import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './PopupDisplay.css';

const PopupDisplay = ({ show, handleClose, title, breakdown }) => {
  return (
    <Popup open={show} closeOnDocumentClick onClose={handleClose}>
      <div className="modal">
        <button className="close" onClick={handleClose}>&times;</button>
        <div className="header">{title}</div>
        <div className="content">
          <table className="table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {breakdown.map((item, index) => (
                <tr key={index}>
                  <td>{item.category_name}</td>
                  <td>{parseFloat(item.total_amount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="actions">
          <button className="button" onClick={handleClose}>Close</button>
        </div>
      </div>
    </Popup>
  );
};

export default PopupDisplay;
