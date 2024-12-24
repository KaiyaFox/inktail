import React from 'react';
import { Button } from '@radix-ui/themes';
import {DiscordLogoIcon} from "@radix-ui/react-icons";
import { createClient } from "../../utils/supabase/client";

const supabase = createClient();


const SignUpButton: React.FC = () => {

    // Push to the login page
        // Handle logging in.
        const handleClick = async () => {
            // Logging in with Discord
            try {
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

                }
                console.log('Signed in with Discord:', data)

            } catch (error) {
                console.error('Some error occurred:', error)
            }
            // setLoading(false)
        }
    return (
        <Button size={"4"} onClick={handleClick} >
            Login using Discord<DiscordLogoIcon/>
        </Button>
    );

};

export default SignUpButton;