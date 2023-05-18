import React from 'react';
import styles from '../styles/storeCard.module.css';
import Link from 'next/link';

const StoreCard = ({ name, discount, store, points }) => {
  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <p>Discount: {discount}%</p>
      <Link
        href={`/purchase?store=${encodeURIComponent(store)}&points=${points}`}
      >
        <span className={styles['purchase-link']}>Purchase</span>
      </Link>
    </div>
  );
};

export default StoreCard;
