'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import CreateNewCommission from './components/commission/CreateNew';

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/login');
  };

  return (
    <div>
      <h1>Welcome to InkTail 🦊</h1>
      <p>Commission based art platform</p>
      <button onClick={handleClick}>Login</button>
      <CreateNewCommission />
    </div>
  );
};


export default HomePage;