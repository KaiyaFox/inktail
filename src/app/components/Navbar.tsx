'use client'
import {Flex, Text, Button, Box, Heading, Avatar} from '@radix-ui/themes';
import React from "react";
import SmallSearchBar from "./Search/SmallSearchBar";
import { useRouter } from 'next/navigation';
import LoginWithDiscordButton from "./LoginWithDiscordButton";

export default function Navbar() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/login');
    };
    return (
        <>
            <Box width="100%" height="100%">
            <nav style={{
                backgroundColor: "#412368",
                color: "#fff",
                padding: "1rem",
                textAlign: "center",
                display: "flex", // Add this
                justifyContent: "space-between", // Add this
            }}>
                <Box>
                    <Heading>InkTail</Heading>
                    <p>Commission based art platform</p>

                </Box>
                <Box>
                    <Avatar
                        src = "https://cdn.discordapp.com/avatars/1234567890/abcdef1234567890abcdef1234567890.png"
                        fallback={"TFP"} />
                </Box>
                <SmallSearchBar/>

                <Box>
                    <Flex gap="3">
                        <Box width="64px" height="64px">
                            <LoginWithDiscordButton />
                        </Box>
                    </Flex>
                </Box>


            </nav>
            </Box>
        </>

    );
}