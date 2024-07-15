/**
 * Endpoint checks for a valid session token then
 * returns a data object of a given user profile.
 *
 * @param {NextRequest} req - The incoming request
 * @param {NextResponse} res - The outgoing response
 *
 */
import { createClient } from "../../../utils/supabase/client"
import { verifyToken } from "../../helpers/verifyToken";
import { NextResponse, NextRequest } from "next/server";

const supabase = createClient();

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

export async function GET(req: NextRequest, res: NextResponse) {
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];
    console.log('token: ', token)
    console.log('auth: ', authHeader)
    try {
        if(!token){
            return NextResponse.json({error: "401 Not Authorized: No token provided"}, {status: 401})
        }
        // Verify token
        await verifyToken(token, res);

        // Get user id from the query params
        const userId = req.nextUrl.searchParams.get('id');
        const username = req.nextUrl.searchParams.get('username');

        if (username) {

        }

        // if (!tokenVerified) {
        //     return NextResponse.json({error: "401 Not Authorized: Invalid token"}, {status: 401})
        // }
        if (!userId) {
            return NextResponse.json({error: "No user id supplied"}, {status: 404})
        }

        // Get user profile data from the database
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();
        if (error) {
            console.error('Error getting profile:', error);
            return NextResponse.json({error: "Invalid input"}, {status: 400})

        }
        const user: User = data;
        console.log(data)
        console.log(user.public)

        // Check if the user exists
        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 404})
        }

        // Check if the user profile is public
        if (user.public === false) {
            return NextResponse.json({error: "Profile is private"}, {status: 403})
        }
        return NextResponse.json(user, {status: 200})


    } catch (error) {
        console.log(error)
        return NextResponse.json({error: "Some error"}, {status: 500})
    }
}