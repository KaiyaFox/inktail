/**
 * Higher order function to wrap the route handler with authentication
 */

import { NextResponse, NextRequest } from "next/server";
import {createClient, SupabaseClient} from "@supabase/supabase-js";
import authMiddleware from "../middleware/authMiddleware";
import {response} from "express";

type Handler = (req: NextRequest, context: { authenticatedUser: any; supabase: SupabaseClient }) => Promise<NextResponse>;

/**
 * Prevent caching of responses
 * @param response
 */
function preventCache(response: NextResponse) {
    response.headers.set("Cache-Control", "no-store, max-age=0");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    return response;
}

/**
 * Higher order function to wrap the route handler with authentication. Use this function to protect routes that require
 * authentication. It automatically verifies the session token and passes the authenticated user and Supabase client to
 * the handler.
 * @param handler
 * @example export const POST = withAuth(async (req, { authenticatedUser, supabase }) => { try { // Your code here } catch (error) { console.error(error); return NextResponse.json({ error: "Internal server error" }, { status: 500 }); } });
 */

export default function withAuth(handler: Handler) {
    return async (req: NextRequest) => {
        const middlewareResponse = await authMiddleware(req);

        if (middlewareResponse instanceof NextResponse) {
            return preventCache(middlewareResponse); // Unauthorized or token missing
        }

        const { token, user } = middlewareResponse;

        // Create a Supabase client scoped to this user
        const userSupabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                global: {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            }
        );

        // Call the actual handler with user and Supabase context
        const response = await handler(req, { authenticatedUser: user, supabase: userSupabase });
        console.log("preventing cache");
        return preventCache(response)
    };
}

