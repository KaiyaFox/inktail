// Helper functions that assist in user account data manipulation

import { createClient } from "../supabase/client";
import {User} from "@supabase/auth-helpers-nextjs";
import {PostgrestError} from "@supabase/supabase-js";
import UserDataContext from "../../../contexts/userDataContext";

// TODO: Create api endpoint to handle account creation
const supabase = createClient();


export const CreateNewAccount = async (formData: any) => {
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
            console.log('Account created successfully!', formData, response);
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
// TODO: Configure RLS policy so we can get the user's onboarding status
export const createUser = async (userId: string, sessionData: any): Promise <boolean | PostgrestError> => {

    try {
        console.log('Verifying user exists in database:', userId);
        const { data, error } = await supabase
            .from('users')
            .select('id')
            .eq('id', userId)
            .single();
        if (!error) {
            console.log('User exists');
        } else {
            console.log('User not found. Attempting to create user:', userId);
            // console.log('Session data:', sessionData);
            // Create the user in users table
            const { data, error } = await supabase
                .from('users')
                .insert([
                    {
                        id: userId,
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
            .select('is_onboarded')
            .single();
        if (error) {
            console.error('Error fetching onboarding status:', error);
            return false;
        } else if (data.is_onboarded === true) {
            console.log('Onboarding status:', data.is_onboarded);
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
            .select('id');
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