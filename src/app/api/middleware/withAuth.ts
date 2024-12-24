/**
 * Higher order function to wrap the route handler with authentication
 */

import { NextResponse, NextRequest } from "next/server";
import {createClient, SupabaseClient} from "@supabase/supabase-js";
import authMiddleware from "../middleware/authMiddleware";

type Handler = (req: NextRequest, context: { authenticatedUser: any; supabase: SupabaseClient }) => Promise<NextResponse>;

export default function withAuth(handler: Handler) {
    return async (req: NextRequest) => {
        const middlewareResponse = await authMiddleware(req);

        if (middlewareResponse instanceof NextResponse) {
            return middlewareResponse; // Unauthorized or token missing
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
        return handler(req, { authenticatedUser: user, supabase: userSupabase });
    };
}

