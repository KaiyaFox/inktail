"use client"
import LoginWithDiscordButton from '../../components/LoginWithDiscordButton'
import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/client'

import {useEffect, useContext, useState, use} from "react";
import {useRouter, useSearchParams, usePathname} from "next/navigation";
import UserDataContext from "../../../contexts/userDataContext";
import {Box, Heading, Skeleton, Text, Section} from "@radix-ui/themes";


interface UserProfile {
    is_admin: boolean;
    username: string;
    email: string;
    pronouns: string;
    gender: string;
    creator: boolean;
    // Add any other properties you expect to use
}




// TODO: Use profileHelper function to profile user data
const UserPage = () => {
    // Get session from global state to use in the fetch request
    const {session} = useContext(UserDataContext); // Destructure the context values you need

    // Local state for the user profile
    // TODO: Ensure profile data contains all relevant user data to be displayed
    const [ profile, setProfile ] = useState<UserProfile | null>(null);

    // Get id parameters from the URL
    const pathname = usePathname();
    const pathSegments = pathname.split('/'); // Split the pathname to profile segments
    const userIdIndex = pathSegments.findIndex(segment => segment === 'user') + 1; // Find the index of 'user' and add 1 to profile the UUID
    const userId = pathSegments[userIdIndex]; // Get the UUID from the array

    console.log('!!!!User ID:', userId); // Use the UUID as needed

    // Fetch user data from the API
    useEffect(() => {
        // Check for session token
        if (session) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`/api/user/profile?id=${userId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${session.access_token}`
                        },
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    // Update the user context with the fetched data
                    setProfile(data);
                    console.log('Fetched data:', data);

                } catch (error) {
                    console.error('There was a problem with fetching user profile:', error);
                }

            };
            fetchData();
        }
    }, [session, userId]); // Rerun effect if session or userId changes
    const admin = profile?.is_admin;

    return (

        <Box
            py="9"
            style={{
                // backgroundImage: `url(${profile.bannerUrl})`,
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
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                }}
            >
                {profile ? (
                    <>
                        <Text style={{ color: 'white', fontSize: '24px' }}>{profile.username}</Text>
                        <Text style={{ color: 'white', fontSize: '18px' }}>{profile.email}</Text>
                        <Text style={{ color: 'white', fontSize: '16px' }}>Pronouns: {profile.pronouns}</Text>
                        <Text style={{ color: 'white', fontSize: '16px' }}>Gender: {profile.gender}</Text>
                        <Text style={{ color: 'white', fontSize: '16px' }}>Creator: {profile.creator}</Text>
                        {/* Add more fields as needed */}
                    </>
                ) : (
                    <Box>
                        Loading...
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default UserPage;