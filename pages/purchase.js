import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Client, Databases, ID, Query } from 'appwrite';
import Link from 'next/link';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
  .setProject('[PROJECT-ID]');

const databases = new Databases(client);

const PurchasePage = () => {
  const router = useRouter();
  const { store, points } = router.query;
  const [rewardPoints, setRewardPoints] = useState(0);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const buttonStyle = {
    backgroundColor: purchaseComplete ? '#ccc' : '#0070f3',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: purchaseComplete ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const product = { name: 'Product 1', price: 50 };

  const handlePurchase = async (price) => {
    const reward = Math.floor(price * (points / 100));
    const documentInfo = JSON.parse(localStorage.getItem('documentInfo'));

    const collectionId = documentInfo.info.$collectionId;
    const documentId = documentInfo.info.$id;
    const databaseId = documentInfo.info.$databaseId;
    const currentPoints = documentInfo.info.points;

    await databases.updateDocument(databaseId, collectionId, documentId, {
      points: currentPoints + reward,
    });

    setRewardPoints(reward);
    setPurchaseComplete(true);
  };

  return (
    <div
      className='container u-padding-24'
      style={{ maxWidth: '800px', margin: '0 auto' }}
    >
      <h1
        style={{
          fontSize: '32px',
          marginBottom: '20px',
          color: 'hsl(var(--color-neutral-300))',
          textAlign: 'center',
        }}
      >
        Complete Purchase and Earn Rewards
      </h1>

      <div
        style={{
          gridTemplateColumns: 'repeat(1, 1fr)',
          gridGap: '20px',
        }}
        className='grid-box'
      >
        <div
          style={{
            border: '1px solid #ddd',
            textAlign: 'center',
            backgroundColor: '#f9f9f9',
            alignSelf: 'center',
            width: '300px',
            justifySelf: 'center',
          }}
          className='u-padding-24'
        >
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <button
            style={buttonStyle}
            className='u-margin-32'
            onClick={() => handlePurchase(product.price)}
            disabled={purchaseComplete}
          >
            {purchaseComplete ? 'Purchased' : 'Purchase'}
          </button>
        </div>
      </div>

      {purchaseComplete && (
        <p
          style={{
            marginTop: '20px',
            fontSize: '16px',
            color: 'green',
            textAlign: 'center',
          }}
        >
          Congratulations! You earned {rewardPoints} reward points for your
          purchase at {store}.{' '}
          <Link style={{ color: 'blue', textDecoration: 'underline' }} href='/'>
            Go Home
          </Link>
        </p>
      )}
    </div>
  );
};

export default PurchasePage;
