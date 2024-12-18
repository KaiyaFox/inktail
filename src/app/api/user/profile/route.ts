import { createClient } from "@supabase/supabase-js";
import { NextResponse, NextRequest } from "next/server";
import authMiddleware from "../../middleware/authMiddleware";

interface User {
    id: string;
    username: string;
    is_admin: boolean;
    gender: string;
    pronouns: string;
    creator: boolean;
    public: boolean;
    mature: boolean;
    filter_mature: boolean;
}

export async function GET(req: NextRequest) {
    // Call the middleware
    const middlewareResponse = await authMiddleware(req);

    // If middleware returns a response (error), return it immediately
    if (middlewareResponse instanceof NextResponse) {
        return middlewareResponse; // Unauthorized or token missing
    }

    // Destructure the validated token and user
    const { token } = middlewareResponse;

    // Create a Supabase client using the validated token
    const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_KEY!,
        {
            global: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        }
    );


    try {
        // Get user id from the query params
        const userId = req.nextUrl.searchParams.get('id');
        if (!userId) {
            return NextResponse.json({ error: "No user id supplied" }, { status: 404 });
        }


        // Get user profile data from the database
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('userId', userId)
            .single();
        if (error) {
            console.error('Error getting profile:', error);
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }
        const user: User = data;

        // Check if the user exists and if the profile is public
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        if (user.public === false) {
            return NextResponse.json({ error: "Profile is private" }, { status: 403 });
        }
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Some error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    // Middleware to verify the session token
    const middlewareResponse = await authMiddleware(req);
    if (middlewareResponse instanceof NextResponse) {
        return middlewareResponse; // Stop processing if middleware fails
    }
    const { token } = middlewareResponse;

    // Additional logic for the PUT request can be added here
}