import './LaundryTracker.css';
import React, { useState, useEffect } from 'react';

const LaundryTracker = () => {
  const [laundryDetails, setLaundryDetails] = useState({
    shirts: 0,
    'T-shirts': 0,
    pants: 0,
    jeans: 0,
    undergarments: 0,
    others: 0,
  });

  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const storedDetails = getLaundryDetailsFromLocalStorage();
    setLaundryDetails(storedDetails);
    calculateTotalItems(storedDetails);
  }, []);

  const handleIncrement = (item) => {
    setLaundryDetails((prevDetails) => ({
      ...prevDetails,
      [item]: prevDetails[item] + 1,
    }));
    calculateTotalItems({ ...laundryDetails, [item]: laundryDetails[item] + 1 });
    saveLaundryDetailsToLocalStorage({ ...laundryDetails, [item]: laundryDetails[item] + 1 });
  };

  const handleDecrement = (item) => {
    if (laundryDetails[item] > 0) {
      setLaundryDetails((prevDetails) => ({
        ...prevDetails,
        [item]: prevDetails[item] - 1,
      }));
      calculateTotalItems({ ...laundryDetails, [item]: laundryDetails[item] - 1 });
      saveLaundryDetailsToLocalStorage({ ...laundryDetails, [item]: laundryDetails[item] - 1 });
    }
  };

  const handleReset = () => {
    if (totalItems !== 0 && window.confirm("All the items will be reset to zero.")) {
      setLaundryDetails({
        shirts: 0,
        'T-shirts': 0,
        pants: 0,
        jeans: 0,
        undergarments: 0,
        others: 0,
      });
      setTotalItems(0);
      localStorage.removeItem('laundryDetails');
    }
  };

  const calculateTotalItems = (details) => {
    const total = Object.values(details).reduce((acc, curr) => acc + curr, 0);
    setTotalItems(total);
  };

  return (
    <div className="laundry-tracker-container">
      <h1 className="laundry-tracker-title">Laundry Tracker</h1>
      <div className="laundry-details-container">
        <div className="laundry-item">
          <span className="laundry-item-label">Shirts:</span>
          <div className="laundry-item-controls">
            <button className="laundry-item-button" onClick={() => handleDecrement('shirts')}>
              -
            </button>
            <span className="laundry-item-value">{laundryDetails.shirts}</span>
            <button className="laundry-item-button" onClick={() => handleIncrement('shirts')}>
              +
            </button>
          </div>
        </div>
        <div className="laundry-item">
          <span className="laundry-item-label">T-shirts:</span>
          <div className="laundry-item-controls">
            <button className="laundry-item-button" onClick={() => handleDecrement('T-shirts')}>
              -
            </button>
            <span className="laundry-item-value">{laundryDetails['T-shirts']}</span>
            <button className="laundry-item-button" onClick={() => handleIncrement('T-shirts')}>
              +
            </button>
          </div>
        </div>
        <div className="laundry-item">
          <span className="laundry-item-label">Pants:</span>
          <div className="laundry-item-controls">
            <button className="laundry-item-button" onClick={() => handleDecrement('pants')}>
              -
            </button>
            <span className="laundry-item-value">{laundryDetails.pants}</span>
            <button className="laundry-item-button" onClick={() => handleIncrement('pants')}>
              +
            </button>
          </div>
        </div>
        <div className="laundry-item">
          <span className="laundry-item-label">Jeans:</span>
          <div className="laundry-item-controls">
            <button className="laundry-item-button" onClick={() => handleDecrement('jeans')}>
              -
            </button>
            <span className="laundry-item-value">{laundryDetails.jeans}</span>
            <button className="laundry-item-button" onClick={() => handleIncrement('jeans')}>
              +
            </button>
          </div>
        </div>
        <div className="laundry-item">
          <span className="laundry-item-label">Undergarments:</span>
          <div className="laundry-item-controls">
            <button className="laundry-item-button" onClick={() => handleDecrement('undergarments')}>
              -
            </button>
            <span className="laundry-item-value">{laundryDetails.undergarments}</span>
            <button className="laundry-item-button" onClick={() => handleIncrement('undergarments')}>
              +
            </button>
          </div>
        </div>
        <div className="laundry-item">
          <span className="laundry-item-label">Others:</span>
          <div className="laundry-item-controls">
            <button className="laundry-item-button" onClick={() => handleDecrement('others')}>
              -
            </button>
            <span className="laundry-item-value">{laundryDetails.others}</span>
            <button className="laundry-item-button" onClick={() => handleIncrement('others')}>
              +
            </button>
          </div>
        </div>
      </div>
      <div className="laundry-total-container">
        <span className="laundry-total-label">Total Items:</span>
        <span className="laundry-total-value">{totalItems}</span>
        <button className="laundry-reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

const getLaundryDetailsFromLocalStorage = () => {
    const storedDetails = localStorage.getItem('laundryDetails');
    return storedDetails ? JSON.parse(storedDetails) : {
      shirts: 0,
      'T-shirts': 0,
      pants: 0,
      jeans: 0,
      undergarments: 0,
      others: 0,
    };
  };
  
  const saveLaundryDetailsToLocalStorage = (laundryDetails) => {
    localStorage.setItem('laundryDetails', JSON.stringify(laundryDetails));
  };
  
  export default LaundryTracker;