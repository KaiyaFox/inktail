'use client'
import {Flex, Text, Button, Box, Heading, Avatar, Link} from '@radix-ui/themes';
import React from "react";
import SmallSearchBar from "./Search/SmallSearchBar";
import { useRouter } from 'next/navigation';
import LoginWithDiscordButton from "./LoginWithDiscordButton";

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
            <nav style={{
                backgroundColor: "#412368",
                color: "#fff",
                padding: "1rem",
                textAlign: "center",
                display: "flex", // Add this
                justifyContent: "space-between", // Add this
            }}>
                <Box>
                    <Link size={"7"} onClick={goHome}
                        style={{fontSize: '28px', cursor: 'var(--cursor-link)'}}>InkTail
                    </Link>
                    <p>Commission based art platform</p>

                </Box>

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