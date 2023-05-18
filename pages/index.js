import React from 'react';
import StoreCard from './StoreCard';
import styles from '../styles/Home.module.css';

const HomePage = () => {
  const uniqueID = '12345'; // Replace with your logic to generate a unique ID
  const totalPoints = 0; // Replace with your logic to calculate the total points

  const stores = [
    { name: 'Store 1', discount: 10 },
    { name: 'Store 2', discount: 20 },
    { name: 'Store 3', discount: 30 },
    // Add more stores as needed
  ];

  return (
    <div className={styles.container}>
      <h1>Welcome to the Rewards App!</h1>
      <p>Unique ID: {uniqueID}</p>
      <p>Total Points: {totalPoints}</p>

      <h2>Redeem Points at Stores</h2>
      <div className={styles['store-grid']}>
        {stores.map((store, index) => (
          <StoreCard
            key={index}
            name={store.name}
            discount={store.discount}
            store={store.name}
            points={store.discount}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
