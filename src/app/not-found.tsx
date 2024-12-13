'use client'
import React from 'react';
import {useContext} from "react";
import UserDataContext from "../contexts/userDataContext";
import {useRouter} from 'next/navigation';
import {Heading, Text, Box, Container, Link, Button} from "@radix-ui/themes";

const NotFoundPage = () => {
    const { userId } = useContext(UserDataContext);
    const router = useRouter();
    const handleClick = () => {
        router.push('/');
    }
    return (
        // Set the parent container to a flex container that fills the viewport
        // and centers its children both vertically and horizontally
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box>
                <Container size={"1"} align={"center"}>
                    <Heading color={'purple'} align={'center'} size={'8'}>404: Page Not Found</Heading>
                    <Text align={'center'} size={'4'}>Uh-oh, the page you were looking for was not found.</Text>
                </Container>
                <Box style={{ textAlign: 'center' }} mb={'4'} mt={'4'}>
                    <Link onClick={handleClick}>
                        <Button radius={"none"} size={"4"}>Return Home</Button>
                    </Link>
                </Box>
            </Box>
        </div>
    );
};

export default NotFoundPage;