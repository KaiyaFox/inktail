
import { createClient } from "../../utils/supabase/client"
import {NextResponse} from "next/server";

const supabase = createClient();
/**
 * Helper function that verifies session token and returns an error if invalid or missing
 *
 */
export async function verifyToken(token: string | null, res: NextResponse): Promise<void> {
    const tokenData = await supabase.auth.getUser(token);
    if (!tokenData || tokenData.error || !token) {
        tokenData.error && console.log(tokenData.error.message)
        NextResponse.json({error: "Unauthorized"}, {status: 401})
        return

    }
}

