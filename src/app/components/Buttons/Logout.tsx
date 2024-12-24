import { useContext, useEffect} from 'react';
import UserDataContext from "../../../contexts/userDataContext";
import React from "react";
import { Button } from '@radix-ui/themes';
import {DiscordLogoIcon} from "@radix-ui/react-icons";
import { createClient } from "../../utils/supabase/client";
import { useRouter } from 'next/navigation';



const supabase = createClient();


const LogoutButton: React.FC = () => {
    const router = useRouter();
    const setUser = useContext(UserDataContext).setUser;

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
            router.push('/')

        } catch (error) {
            console.error('Some error occurred:', error)
        }
    }
    return(
        <Button size={"4"} onClick={handleLogout}>
            Logout<DiscordLogoIcon/>
        </Button>
    )
}

export default LogoutButton;