import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/purchasePage.module.css';

const PurchasePage = () => {
  const router = useRouter();
  const { store, points } = router.query;

  const [rewardPoints, setRewardPoints] = useState(0);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const products = [
    { name: 'Product 1', price: 10 },
    { name: 'Product 2', price: 20 },
    { name: 'Product 3', price: 30 },
    // Add more products as needed
  ];

  const handlePurchase = (price) => {
    // Simulate payment completion
    // You can replace this with your custom logic for simulating payment
    // For demonstration purposes, we'll simply mark the purchase as complete

    // Calculate the reward points (e.g., 10% of the purchase points)
    const reward = Math.floor(points * 0.1); // Adjust the reward calculation as per your requirements

    // Update the reward points and mark purchase as complete
    setRewardPoints(reward);
    setPurchaseComplete(true);
  };

  return (
    <div className={styles.container}>
      <h1>Complete Purchase and Earn Rewards</h1>

      <div className={styles.grid}>
        {products.map((product, index) => (
          <div className={styles.product} key={index}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <button
              className={styles.purchaseButton}
              onClick={() => handlePurchase(product.price)}
              disabled={purchaseComplete}
            >
              {purchaseComplete ? 'Purchased' : 'Purchase'}
            </button>
          </div>
        ))}
      </div>

      {purchaseComplete && (
        <p className={styles.rewardMessage}>
          Congratulations! You earned {rewardPoints} reward points for your
          purchase at {store}.
        </p>
      )}
    </div>
  );
};

export default PurchasePage;
