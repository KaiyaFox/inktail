"use client"
import LoginWithDiscordButton from '../../components/LoginWithDiscordButton'

import { redirect } from 'next/navigation'

import { createClient } from '../../utils/supabase/client'
import {useEffect, useContext} from "react";
import UserDataContext from "../../../contexts/userDataContext";
import {Box, Heading, Skeleton, Text, Section} from "@radix-ui/themes";

const UserPage = () => {
    const { user, userId, email, username, avatarUrl, setUser, session, setSession } = useContext(UserDataContext); // Destructure the context values you need
    console.log('Email:', email)

    return (
        <Box
            py="9"
            style={{
                backgroundImage: `url(${avatarUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 'var(--radius-3)',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
            }}
        >
            <Box
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: '24px',
                        position: 'relative',
                    }}
                >
                    {username}
                </Text>
            </Box>
        </Box>

    );
};

export default UserPage;