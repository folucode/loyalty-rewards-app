import React, { useEffect, useState } from 'react';
import Store from './store';
import { Client, Databases, ID, Query } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('[PROJECT-ID]');

const databases = new Databases(client);

const HomePage = () => {
  const [points, setPoints] = useState(0);

  const stores = [
    { name: 'Store 1', discount: '10% off', points: 10 },
    { name: 'Store 2', discount: '20% off', points: 20 },
    { name: 'Store 3', discount: '30% off', points: 30 },
    { name: 'Store 4', discount: '40% off', points: 40 },
  ];

  useEffect(() => {
    checkUser();
  }, []);

  const storePoints = async (uniqueID, points) => {
    await databases.createDocument(
      '646a20a583e20fd44d35',
      '646a2112a4601b39a496',
      ID.unique(),
      { userID: uniqueID, points }
    );
  };

  const checkUser = async () => {
    let userIP = await fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then(async (data) => data.ip)
      .catch((error) => {
        console.error('Error fetching IP address:', error);
      });

    const user = await databases.listDocuments(
      '[DATABASE-ID]',
      '[COLLECTION-ID]',
      [Query.equal('userID', userIP)]
    );

    if (user.total < 1) {
      storePoints(userIP, 0);
    } else {
      localStorage.setItem(
        'documentInfo',
        JSON.stringify({ info: user.documents[0] })
      );
      setPoints(user.documents[0].points);
    }
  };

  return (
    <div
      className='container'
      style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}
    >
      <h1
        style={{
          fontSize: '32px',
          marginBottom: '20px',
          color: 'hsl(var(--color-neutral-300))',
        }}
      >
        Rewards App
      </h1>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <p style={{ fontSize: '24px', color: 'hsl(var(--color-neutral-300))' }}>
          Total Points:
        </p>
        <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#0070f3' }}>
          {points}
        </p>
      </div>

      <div
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gridGap: '20px',
        }}
        className='grid-box'
      >
        {stores.map((store, index) => (
          <Store
            key={index}
            name={store.name}
            discount={store.discount}
            store={store.name}
            points={store.points}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
