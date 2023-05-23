import React from 'react';
import Link from 'next/link';

const StoreCard = ({ name, discount, store, points }) => {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
      }}
      className='u-padding-24'
    >
      <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{name}</h3>

      <p style={{ fontSize: '16px', color: '#0070f3' }}>{discount}</p>

      <Link
        style={{
          marginTop: '20px',
          textAlign: 'center',
          textDecoration: 'none',
          backgroundColor: '#0070f3',
          fontWeight: 'bold',
          fontSize: '16px',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          cursor: 'pointer',
          transition: 'backgroundColor 0.3s ease',
        }}
        className='u-block'
        href={`/purchase?store=${encodeURIComponent(store)}&points=${points}`}
      >
        <span>Purchase</span>
      </Link>
    </div>
  );
};

export default StoreCard;
