'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { NextRouter } from 'next/router';
import CreateNewCommission from './components/commission/CreateNew';
import {Box, Button, Container, Text, Heading, Separator, Flex} from "@radix-ui/themes";
import LargeSearchBar from "./components/Search/LargeSearchBar";
import SignUpButton from "./components/Buttons/SignUp";
import CreateSprintDialog from "./components/commission/Create/CommissionSprint";
import AccountSetup from "./components/Onboarding/AccountSetup";
import Basic from "./components/Onboarding/Form";
import {NewCharacterDialog} from "./components/Character/CreateCharacterDialog";

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/login');
  };

  return (
      <>
          <Box style={{
              display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem',
          }}>
              <Text mb={"1"} size={"9"} style={{textAlign: 'center', padding: '2rem'}}>InkTail</Text>
              <Flex gap="3" align={"center"}>
              <Separator size={"3"} orientation="vertical" />
                  <Text size={"5"} as="p">The commission management platform for furry creators and artists.</Text>
          </Flex>


      </Box>
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
              <SignUpButton />
          </Box>

          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem'}}>
              <Container>
                  <LargeSearchBar/>
              </Container>
          </Box>


      </>

  );
};


export default HomePage;