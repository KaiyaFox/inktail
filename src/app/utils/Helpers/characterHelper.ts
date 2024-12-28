/**
 * This module contains helper functions for character creation management.
 */
import { createClient } from "../supabase/client";
import {User} from "@supabase/auth-helpers-nextjs";
import {PostgrestError} from "@supabase/supabase-js";
import UserDataContext from "../../../contexts/userDataContext";
import {AlertDialog} from "@radix-ui/themes";
import {useContext} from "react";


export async function CreateNewCharacter (formData: any): Promise<boolean>{
    console.log('Form Data:', formData);
    console.log('Access Token:', formData.accessToken);

    try {

        console.log('Calling backend to create character...');
        const response = await fetch('/api/character/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${formData.accessToken}`,
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            console.log('Calling DB API', formData, response);
            return true;
        } else {
            console.error('Failed to create character', formData, response);
            return false;
        }
    } catch (error) {
        console.error('Error creating character:', error);
        return false;
    }
}