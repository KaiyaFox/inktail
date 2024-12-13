// API route creates a new commission by inserting a new row into the commissions table in the database

import { NextResponse, NextRequest } from "next/server";
import { createClient } from "../../../utils/supabase/server";
import { Commission } from "../../../types/commission";
import { headers } from "next/headers";
import { verifyToken} from "../../helpers/verifyToken";
import { createClientWithToken } from "../../../utils/supabase/client";

// Create a new Supabase client
const supabase = createClient();

// Create commission endpoint
export async function POST(req: NextRequest, res: NextResponse) {
    // Verify the user's token
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return NextResponse.json({ message: "Authorization token is missing" }, { status: 401 });
    }

    // Create a supabase client with the token provided
    const supabase = createClientWithToken(token);

    const headersList = headers();
    try {
        // Log the entire request body received
        console.log("Incoming Request Body:", req.body);
        const body = await req.json();
        console.log("Parsed Request Body:", body);

        const newCommission: Commission = {
            title: body.title,
            description: body.description,
            creator_id: body.creator_id,
            commissioner_id: body.commissioner_id,
            price: null,
            media_storage: body.media_storage,
            created_at: new Date(),
            is_mature: false,
            status: null,
            media_type: body.media_type,
        };
        console.log("New Commission: ", newCommission);

        // Insert the new commission into the database
        const { data, error } = await supabase
            .from("commissions")
            .insert({
                title: newCommission.title,
                description: newCommission.description,
                creator_id: newCommission.creator_id,
                commissioner_id: newCommission.commissioner_id,
                price: newCommission.price,
                media_storage: newCommission.media_storage,
                media_type: newCommission.media_type,
                created_at: newCommission.created_at,
                is_mature: newCommission.is_mature,
                status: newCommission.status,
            })
            .select();

        // Return the responses
        return NextResponse.json({ commissionData: data, error });
    } catch (error) {
        console.error("Error in POST request", error);
        return NextResponse.json({ message: "POST request failed" });
    }
}
