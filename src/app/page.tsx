'use client';
import React from 'react';
import LoginWithDiscordButton from './components/LoginWithDiscordButton';
import { createClient } from '@supabase/supabase-js';
import { useEffect } from 'react';


const HomePage: React.FC = () => {

  return (
    <div>
      <h1>Welcome to InkTail 🦊</h1>
      <p>Commission based art platform</p>
      <LoginWithDiscordButton />
    </div>
  );
};

export default HomePage;