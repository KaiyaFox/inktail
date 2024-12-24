import { NextResponse, NextRequest } from "next/server";
import withAuth from "../../middleware/withAuth";

interface User {
    userId: string;
    username: string;
    is_admin: boolean;
    gender: string;
    pronouns: string;
    creator: boolean;
    public: boolean;
    mature: boolean;
    filter_mature: boolean;
}


export const GET = withAuth(async(req, { authenticatedUser, supabase }) => {
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
            .single()
        console.log(data)
        if (error) {
            console.error('Error getting profile:', error);
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }
        const user: User = data;

        console.log(user.public)

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
})