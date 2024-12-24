'use client'
import {Flex, Text, Button, Box, Heading, Avatar, Link, Container} from '@radix-ui/themes';
import React from "react";
import SmallSearchBar from "./Search/SmallSearchBar";
import { useRouter } from 'next/navigation';
import LoginWithDiscordButton from "./LoginWithDiscordButton";
import Image from 'next/image';

export default function Navbar() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/login');
    };
    // Push to home page
    const goHome = () => {
        router.push('/');
    }
    return (
        <>
            <Box width="100%">
            <Box style={{
                backgroundColor: "#412368",
                color: "#fff",
                padding: "1rem",
                textAlign: "center",
                display: "flex", // Add this
                justifyContent: "space-between", // Add this
                alignItems: "center",
            }}>
                <Box style={{ maxWidth: "100px", maxHeight: "100px", overflow: "hidden" }}>
                    <Link size={"7"} onClick={goHome}></Link>
                    <Container size={"3"}>
                        <Link href="/">
                            <Image
                                src="/inktail.webp"
                                alt="InkTail logo"
                                width={100}
                                height={100}
                            />
                        </Link>
                    </Container>
                </Box>

                <Box>
                    <Flex gap="3">
                        <Box width="64px" height="64px">
                            <LoginWithDiscordButton />
                        </Box>
                    </Flex>
                </Box>


            </Box>
            </Box>

        </>

    );
}