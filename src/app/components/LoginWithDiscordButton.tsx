"use client";

import React from 'react';
import { useContext, useEffect } from 'react';
import { createClient } from "../utils/supabase/client";
import {createUser, testConnection} from "../utils/Helpers/accountHelper";
import { useRouter } from 'next/navigation';
import UserDataContext from "../../contexts/userDataContext";
import Image from 'next/image';
import { middleware } from '../../middleware';
import {Button, Avatar, Flex, Skeleton, Box, HoverCard, Link, Heading, Text, Badge, Spinner, Switch} from "@radix-ui/themes";
import { ExitIcon } from '@radix-ui/react-icons';
import {User} from "@supabase/auth-helpers-nextjs";
import {boolean} from "yup";
import * as test from "node:test";
import userDataContext from "../../contexts/userDataContext";

interface LoginWithDiscordButtonProps {
    user?: any;
    session?: any;
    userMetadata?: any;
    avatarUrl?: string;
}

const LoginWithDiscordButton: React.FC<LoginWithDiscordButtonProps> = (props) => {
    // Getter and setter functions for user data
    const {
        user,
        setUser,
        session,
        setSession,
        isOnboarded,
        setIsOnboarded,
        userId,
        setUserId,
        setEmail,
        setUsername,
        setAvatarUrl,
    } = useContext(UserDataContext);
    const [loading, setLoading] = React.useState<boolean>(false);
    const router = useRouter();

    // Handle Navigation
    const handleNavigation = (path: string) => {
        router.push(path)
    }

    const supabase = createClient()


    // Handle logging in.
    const handleLogin = async () => {
        // Logging in with Discord
        try {
            setLoading(true)
            console.log('Signing in with Discord...')
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'discord',
                options: {
                    redirectTo: 'http://192.168.50.11:3000/',
                    queryParams: {},
                },
            })
            if (error) {
                console.error('Error signing in with Discord:', error.message)
                setLoading(false)

            }
            console.log('Signed in with Discord:', data)

        } catch (error) {
            setLoading(false)
            console.error('Some error occurred:', error)
        }
        // setLoading(false)
    }

    // Handle logging out.


    const handleLogout = async () => {

        try {
            console.log('Logging out...')
            const { error } = await supabase.auth.signOut()
            if (error) {
                console.error('Error logging out:', error.message)
                return
            }
            console.log('Logged out successfully')
            setUser(null)
            router.refresh();
            // router.push('/')

        } catch (error) {
            console.error('Some error occurred:', error)
        }
    }
    /**
     *
     * */
    // Hook checks if user exists and has completed onboarding
    useEffect(() => {
        // Check if user has set up account and completed onboarding
        async function onboardChecker() {
            console.log('Checking onboarding status...')
            const status = await createUser(userId, session)
            if (status === false) {
                console.log('User has not completed onboarding')
                // Show toast notification

                setIsOnboarded(status)
                router.push('/setup')
            } else if (status === null) {
                console.error('Error fetching onboarding status')
            } else {
                console.log('User has completed onboarding')
                setIsOnboarded(status)
                console.log(isOnboarded)
                // router.push(`/${userId}`)
            }

        }
        if (userId) {
            onboardChecker()
        }
    }, [userId, session])


    // Get the session when the component mounts.
    useEffect(() => {

        const getSessionData = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error getting session:', error.message);
                return;
            }
            if (session) {
                const token = session.access_token;
                const fetchUser = async () => {
                    const { data: { user } } = await supabase.auth.getUser()
                    setUser(user)
                    setUserId(user.id)
                    setEmail(user.email)
                    setUsername(user.user_metadata.custom_claims.global_name)
                    setAvatarUrl(user.user_metadata.avatar_url)
                    setSession(session)
                }
                await fetchUser()

                console.log('Access token:', token);
            } else {
                console.error('No logged in user found');
            }
            // Listen for changes to the auth state to update the session.
            const { data: authListener } = supabase.auth.onAuthStateChange(
                async (event, session) => {
                    console.log('Auth event:', event);
                    setSession(session?.user ?? null);
                    // If the session expires, log out the user.
                    if (session?.expires_at && session?.expires_at < new Date().getTime()) {
                        const expiresAt = new Date(session.expires_at * 1000);
                        console.log('Session Active:', session);
                        console.log('Session Expires At:', expiresAt);
                        setSession(session)
                    } else {
                        console.log('Session status:', session);
                        setSession(null)
                    }
                }
            );

            return () => {
                authListener.subscription.unsubscribe();
            };

        }
        (async () => {
            await getSessionData();
        })();
    }, [supabase.auth, router]);

    if (loading) {
        return (
            <Button color="red" disabled={true}>
                Login <Spinner />
            </Button>
        )
    }

    return (
        <>
            {user ? (
                <>
                    <Box>
                        <Flex align="center" gap={"4"}>
                            <HoverCard.Root>
                                <HoverCard.Trigger>

                                <Link
                                    onClick={() => handleNavigation(`/user/${userId}`)}
                                      style={{ cursor: 'pointer'}}>
                                    <Avatar
                                        radius="large"
                                        size="5"
                                        src={user.user_metadata.avatar_url}
                                        fallback={user.user_metadata.custom_claims.global_name.charAt(0)}
                                    />
                                </Link>
                                </HoverCard.Trigger>

                                <HoverCard.Content maxWidth="300px">
                                    <Flex gap="5">
                                        <Avatar
                                            size="3"
                                            fallback={user.user_metadata.custom_claims.global_name.charAt(0)}
                                            radius="full"
                                            src={user.user_metadata.avatar_url}
                                        />
                                        <Box>

                                            <Heading size="3" as="h3">
                                                {user.user_metadata.custom_claims.global_name}
                                            </Heading>
                                            {}
                                            <Badge variant="surface" radius="full" color="purple">
                                                {}
                                            </Badge>
                                            <Text as="div" size="2" color="gray" mb="2">
                                                {user.email}
                                            </Text>
                                            <Text as="div" size="1">
                                                <Box>
                                                    <Button size={"2"} color={"purple"} onClick={() => handleNavigation(`/user/${userId}`)}>View Profile</Button>
                                                    <Box>
                                                        <Button mb={'3'} size={"2"} color={"purple"}>Favourites</Button>
                                                    </Box>
                                                    <Box>
                                                        <Button mb={'3'} size={"2"} color={"purple"} onClick={() => handleNavigation('/settings')}>Settings</Button>

                                                    </Box>
                                                    <Button size={"2"} color={"red"} onClick={handleLogout}>
                                                        Logout <ExitIcon />
                                                    </Button>
                                                </Box>

                                                    <Text size={"2"}>Filter NSFW <Switch size={"3"} radius={"full"}  />
                                                    </Text>

                                            </Text>
                                        </Box>
                                    </Flex>
                                </HoverCard.Content>
                            </HoverCard.Root>
                        </Flex>
                    </Box>



                </>
            ) : (
                <Button color="purple" onClick={handleLogin}>
                    Login
                </Button>
            )}
        </>
    );
};

export default LoginWithDiscordButton;