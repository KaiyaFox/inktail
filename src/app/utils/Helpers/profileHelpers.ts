/**
 * This helper function is used to help profile public user profile data on the /users/[id] page.
 * Function will return a data object with the user's profile information.
 * @param userId The user ID of the profile to load.
 */
import {PostgrestError} from "@supabase/supabase-js";
import { createClient } from "../supabase/client";

/**
 * This function takes in a string 'userId' and gets the corresponding user's profile data.
 * @param userId The user ID of the profile to load.
 * @example getProfile('27c2b33b-c190-4b2f-8ff8-72a7a61a2c1a')
 * @returns {Promise<{} | PostgrestError>} The user's profile data or a PostgrestError.
 */
export const getProfile = async (userId: string): Promise <{} | PostgrestError> => {
    // Check if users profile is public. If true then return the profile data. If false then return false.

    try {
        console.log('Checking if user requested profile is public:', userId);
        const supabase = createClient();
        const { data, error } = await supabase
            .from('users')
            .select('id')
            .eq('id', userId)
            .single(); // Only 1 row should be returned
    } catch (error) {
        console.error('Error getting profile:', error);
        return error;
    }
}