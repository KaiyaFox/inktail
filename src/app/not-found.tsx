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

            <Box>
                <Container size={"1"} align={"center"}>
            <Heading>404: Page Not Found</Heading>
            <Text>Sorry, the page you were looking for was not found.</Text>
                    <Link onClick={handleClick}>
                        <Button radius={"none"} size={"4"}>Return Home</Button>
                    </Link>
                    {userId && <p>Logged in as: {userId}</p>}

                </Container>


            </Box>
    );
};

export default NotFoundPage;