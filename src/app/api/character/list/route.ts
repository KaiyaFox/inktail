import { NextResponse, NextRequest } from "next/server";
import withAuth from "../../middleware/withAuth";

export const GET = withAuth(async (req, { authenticatedUser, supabase }) => {
    try {
        const { data, error } = await supabase
            .from('characters')
            .select('*');
        if (error) {
            console.error('Error getting characters:', error);
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Some error" }, { status: 500 });
    }
});

