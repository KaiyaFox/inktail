
import { createClient } from "../../utils/supabase/client"
import {NextResponse} from "next/server";

const supabase = createClient();
/**
 * Helper function that verifies session token and returns an error and halts if invalid or missing
 * @param {string | null} token - The session token
 * @example await verifyToken(token)
 */
export async function verifyToken(token: string | null): Promise<void> {
    if (!token) {
        throw new Error("No token provided");
    }
    const { error } = await supabase.auth.getUser(token);
    if (error) {
        throw new Error("Unauthorized");
    }
}
