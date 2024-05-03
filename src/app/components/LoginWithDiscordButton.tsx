"use client";

import React from 'react';
import { NextResponse, NextRequest } from 'next/server';
import { createClient } from "../utils/supabase/client";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { middleware } from '../../middleware';

interface LoginWithDiscordButtonProps {
    user?: any;
    session?: any;
    userMetadata?: any;
    avatarUrl?: string;
}

const LoginWithDiscordButton: React.FC<LoginWithDiscordButtonProps> = (props) => {
    const [user, setUser] = React.useState<null | any>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [session, setSession] = React.useState<any>(null);
    const router = useRouter();

    const supabase = createClient()
    const handleLogin = async () => {
        // Sign in with Discord
        try {
            console.log('Signing in with Discord...')
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'discord',
                options: {
                    redirectTo: 'http://localhost:3000/',
                    queryParams: {},
                },

            })
            if (error) {
                console.error('Error signing in with Discord:', error.message)
                return
            }
            console.log('Signed in with Discord:', data)
        } catch (error) {
            console.error('Some error occurred:', error)
        }
    }

    // Get the session on load.
    React.useEffect(() => {

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
                    console.log('User:', user)
                }
                fetchUser()

                console.log('Access token:', token);
            } else {
                console.log('No active session');
            }
            // Listen for changes to the auth state. 
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
                        console.log('Session Expired:', session);
                        setSession(null)
                    }
                }
            );

            return () => {
                authListener.subscription.unsubscribe();
            };

        }
        getSessionData()
    }, [supabase.auth])


    const handleLogout = async () => {
        try {
            console.log('Logging out...')
            const { error } = await supabase.auth.signOut()
            // refresh the page
            console.log('Redirecting to home page...')

            if (error) {
                console.error('Error logging out:', error.message)
                return
            }
            console.log('Logged out successfully')
        } catch (error) {
            console.error('Some error occurred:', error)
            router.refresh();
        }
    }
    return (
        <>
            {user ? (
                <><p>Welcome, {user.user_metadata.custom_claims.global_name}</p>
                    <Image src={user.user_metadata.avatar_url}
                        alt="Discord avatar"
                        width={65}
                        height={65}
                        priority={true}
                        placeholder='empty' />
                    <button onClick={handleLogout}>

                        Logout
                    </button></>
            ) : (
                <button onClick={handleLogin}>
                    Login with Discord
                </button>
            )}
        </>
    );
};

export default LoginWithDiscordButton;