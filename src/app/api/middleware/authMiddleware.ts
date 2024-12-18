import { NextResponse, NextRequest } from "next/server";
import { createClient } from "../../utils/supabase/client";

const supabase = createClient();

/**
 * Middleware to verify the session token
 * @param req - Give the incoming request to verify a token from the Authorization header
 * @returns { token, user } returns the token and user object for further use.
 * @example
 *     // Call the middleware
 *     const middlewareResponse = await authMiddleware(req);
 *
 *     // If middleware returns a response (error), return it immediately
 *     if (middlewareResponse instanceof NextResponse) {
 *         return middlewareResponse; // Unauthorized or token missing
 *     }
 *     // Destructure the validated token and user
 *     const { token } = middlewareResponse;
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
