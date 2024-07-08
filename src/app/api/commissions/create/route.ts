// API route creates a new commission by inserting a new row into the commissions table in the database

import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "../../../utils/supabase/server";
import { uuid } from "uuidv4";
import { Commission } from "../../../types/commission";
import { headers } from "next/headers";

// Create a new Supabase client
const supabase = createClient();

// Create commission endpoint
export async function POST(req: NextRequest, res: NextRequest) {
    const headersList = headers();
  try {
    // Log the entire request body received
    console.log("Incoming Request Body:", req.body);
    const body = await req.json();
    console.log("Parsed Request Body:", body);
    // Create a new commission object using the Commission interface. Supabase generates the commissions ID
    // const testCommisionId = uuid();

    const newCommission: Commission = {
      title: body.title,
      description: body.description,
      creator_id: body.creator_id,
      commissioner_id: body.commissioner_id, // Test user ID
      price: null,
      media_storage: body.media_storage,
      created_at: new Date(),
      is_mature: false,
      // id: "", ID will be generated by the database
      status: null, // Default status for any new commission
      media_type: body.media_type,
    };
    console.log("New Commission: ", newCommission);

    // Insert the new commission into the database
    const { data, error } = await supabase
      .from("commissions")
      .insert({
        // id: newCommission.id, // This will be generated by the database
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
