import { NextResponse, NextRequest } from "next/server";
import { createClient } from "../../utils/supabase/client"

const supabase = createClient();

/**
 * Middleware to verify the session token
 * @param req
 * @retruns NextResponse
 * @example await authMiddleware(req)
 */
export async function authMiddleware(req: NextRequest) {
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    try {
        const { error } = await supabase.auth.getUser(token);
        if (error) {
            throw new Error("Unauthorized");
        }
        // Token is verified, proceed with the request
        return NextResponse.next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
}

export default authMiddleware;