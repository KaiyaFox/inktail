import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);
export async function GET(req: NextRequest) {
  try {
    console.log("Inside GET request");

    const { data, error } = await supabase
      .from("Commissions")
      .insert({ id: 2, created_at: new Date(), isMature: false })
      .select();
    return NextResponse.json({ message: data, error });
  } catch (error) {
    console.error("Error in GET request", error);
    return NextResponse.json({ message: "GET request failed" });
  }
}
