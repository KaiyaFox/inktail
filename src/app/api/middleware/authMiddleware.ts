import { NextResponse, NextRequest } from "next/server";
import { createClient } from "../../utils/supabase/client";

const supabase = createClient();

/**
 * Middleware to verify the session token
 * @param req
 * @returns { token, user } or a NextResponse for error
 */
export async function authMiddleware(req: NextRequest) {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    try {
        const { data: user, error } = await supabase.auth.getUser(token);
        if (error || !user) {
            throw new Error("Unauthorized");
        }

        // Return user and token for further use
        return { token, user };
    } catch (error) {
        console.error("Error verifying token:", error);
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}

export default authMiddleware;
