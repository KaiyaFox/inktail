import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
