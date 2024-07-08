'use client';
// Admin page to display debug information and manage the application.

import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserDataContext from "../../contexts/userDataContext";
import {Heading, Box, Text, Button} from "@radix-ui/themes";

export default function AdminPage() {
    const router = useRouter();
    const { isAdmin } = useContext(UserDataContext);
    const { userId } = useContext(UserDataContext);
    const { isOnboarded } = useContext(UserDataContext);
    const { displayName } = useContext(UserDataContext);



    useEffect(() => {
        if (isAdmin !== true) {
            const timer = setTimeout(() => {
                router.push('/');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isAdmin, router]);

    if (isAdmin === true) {
        return (
            <div>
                <Heading>Admin Page</Heading>
                <p>Debug information and application management</p>
                <Box>
                    {userId && <p>Logged in as: {displayName} {userId}</p>}
                    {isOnboarded && <p>Onboarded: {isOnboarded}</p>}
                </Box>
            </div>
        )

    } else {
return (
            <div>
                <Heading>Access Denied</Heading>
                <Text>You must be an administrator to view this page.</Text>
                <br></br>
                <Button onClick={() => router.push('/')}>Return to Home</Button>
            </div>
        )
    }
}