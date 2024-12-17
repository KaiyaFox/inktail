import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
);


// Search a specific user in the user database
export async function GET(req: NextRequest) {
    try {
        console.log("Inside GET request");

        const query  = req.nextUrl;
        if (!query) {
            return NextResponse.json({ message: "No query supplied" });
        } else {
            console.log("Query:", query);
            const username = query.searchParams.get('username');

            console.log("Username:", username);

            const { data, error } = await supabase
                .from("users")
                .select('username')
                .eq('username', username)
                .single()

            if (error) {
                console.error("Error fetching user data:", error);
                return NextResponse.json({ found: false, message: "User not found", error });
            }
            return NextResponse.json({ found: true, message: `User found!`, error });
        }
    } catch (error) {
        console.error("Error in GET request", error);
        return NextResponse.json({ message: "GET request failed" });
    }
}
