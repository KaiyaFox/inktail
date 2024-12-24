import { NextResponse, NextRequest } from "next/server";
import { createClient } from "../../utils/supabase/client";

const supabase = createClient();

/**
 * Middleware to verify the session token has the correct user within it.
 * @param req - Pass the incoming req to verify a token from the Authorization header
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
    console.log("Auth middleware called");
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];
    createUnauthorizedResponse();

    if (!token) {
        return createUnauthorizedResponse();
    }

    try {
        // Fetch the user using Supabase and ensure no caching
        const { data: user, error } = await supabase.auth.getUser(token);
        if (error || !user) {
            throw new Error("Unauthorized");
        }

        // Return user and token for further use
        // console.log("Auth ok: ", token, user);
        return { token, user };
    } catch (error) {
        console.error("Error verifying token:", error);
        return createUnauthorizedResponse();
    }
}

/**
 * Helper to create an unauthorized response with no caching.
 */

// Todo: Fix cache issue for all endpoints
function createUnauthorizedResponse() {
    const response = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    response.headers.set("Cache-Control", "no-store, max-age=0");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    return response;
}

export default authMiddleware;
