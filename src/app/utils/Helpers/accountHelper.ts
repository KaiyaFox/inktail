/**
 * This module contains helper functions for user account management.
 */
import { createClient } from "../supabase/client";
import {User} from "@supabase/auth-helpers-nextjs";
import {PostgrestError} from "@supabase/supabase-js";
import UserDataContext from "../../../contexts/userDataContext";
import {AlertDialog} from "@radix-ui/themes";

// TODO: Create api endpoint to handle account creation
const supabase = createClient();

/**
 * The CreateNewAccount fn creates a new user account in the database. Simply pass it form data It calls the backend API to create a new user and then
 * returns a boolean.
 * @param formData
 * @type {object} - The form data object containing the user's email, password, and other details.
 * @example CreateNewAccount(formData) // returns true or false
 * @returns {boolean} - Returns true if the account was created successfully, otherwise false.
 *
 */
export async function CreateNewAccount (formData: any): Promise<boolean>{
    try {
        console.log('Calling backend to create account...');
        const response = await fetch('/api/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            console.log('Calling DB API', formData, response);
            return true;
        } else {
            console.error('Failed to create account', formData, response);
            return false;
        }
    } catch (error) {
        console.error('Error creating account:', error);
        return false;
    }
}
/**
 * This function checks if the user exists in the database.
 * If not, it will create a new user and return the user's onboarding status.
 *
 *
 * @param {string} userId - The user's unique ID from the session data.
 * @param {*} sessionData - The user's session data
 * @returns {PostgrestError | boolean} The user's onboarding status is truthy or postgrest db error.
 * @example createUser('12345', sessionData) // returns true or PostgrestError
 * @see checkOnboardingStatus
 *
 *
 * */

// Checks if the userid exists in the users table. If not, it will create a new user.
// TODO: Configure RLS policy so we can profile the user's onboarding status
export const createUser = async (userId: string, sessionData: any): Promise <boolean | PostgrestError> => {

    try {
        console.log('Verifying user exists in database:', userId);
        const { data, error } = await supabase
            .from('users')
            .select('userId')
            .eq('userId', userId)
            .single();
        if (!error) {
            console.log('User exists');
        } else {
            console.log('User not found. Attempting to create user:', userId);
            // console.log('Session data:', sessionData);

            // Create a new user in the database
            const { data, error } = await supabase
                .from('users')
                .insert([
                    {
                        userId: userId,
                        email: sessionData.user.email,
                    }

                ]);
            if (error) {
                console.error('Error creating user:', error);
                return error;
            }
        }

    } catch (error) {
        console.error('Something went wrong: ', error);
        return error;
    } finally {
        // Check if user has completed onboarding
        const status = await checkOnboardingStatus(userId);
        return status;
    }
};

// Subroutine to check if user has completed onboarding
export const checkOnboardingStatus = async (userId: string) => {
    try {
        console.log('Checking onboarding status...');
        const { data, error } = await supabase
            .from('users')
            .select('onboarding')
            .eq('userId', userId)
            .single();
        if (error) {
            console.error('Error fetching onboarding status:', error);
            return false;
        } else if (data.onboarding === true) {
            console.log('Onboarding status:', data.onboarding);
            return true;
        } else {
            console.error('User onboarding status not found:', userId);
            return false;
        }
    } catch (error) {
        console.error('Error fetching onboarding status:', error);
        return false
    }
}

// Delete account not implemented yet
export const DeleteAccount = async (formData: any) => {
    try {
        console.log('Calling backend to delete account...');
        const response = await fetch('/api/user/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            console.log('Account deleted successfully!', formData, response);
            return true;
        } else {
            console.error('Failed to delete account', formData, response);
            return false;
        }
    } catch (error) {
        console.error('Error deleting account:', error);
        return false;
    }
}

// Test function to check connection to the supabase database.
export const testConnection = async () => {
    console.log('Testing connection to database...')
    try {
        const { data, error } = await supabase
            .from('users')
            .select('userId');
        if (error) {
            console.error('Error fetching user data:', error.message);
            return false;
        } else if (data) {
            console.log('Data:', data);
            return true;
        } else {
            console.error('No data found');
            return false;
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        return false;
    }
}