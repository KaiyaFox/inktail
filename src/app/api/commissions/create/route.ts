import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import authMiddleware from "../../middleware/authMiddleware";
import { Commission } from "../../../types/commission";

export async function POST(req: NextRequest) {
    // Call the middleware
    const middlewareResponse = await authMiddleware(req);

    // If middleware returns a response (error), return it immediately
    if (middlewareResponse instanceof NextResponse) {
        return middlewareResponse; // Unauthorized or token missing
    }

    // Destructure the validated token
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