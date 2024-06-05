'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { NextRouter } from 'next/router';
import CreateNewCommission from './components/commission/CreateNew';
import {Box, Button} from "@radix-ui/themes";
import LargeSearchBar from "./components/Search/LargeSearchBar";

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/login');
  };

  return (
      <>
          <Box>
              <LargeSearchBar/>
          </Box>

      </>

  );
};


export default HomePage;