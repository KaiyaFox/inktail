import { NextResponse, NextRequest } from "next/server";
import withAuth from "../../middleware/withAuth";

export const POST = withAuth(async (req, { authenticatedUser, supabase }) => {
    try {
        // Log the entire request body received and the authenticated user
        const body = await req.json();
        console.log("Request Body:", body);
        console.log("Authenticated user: ", authenticatedUser.user.id);

        // Check userId matches session
        if (authenticatedUser.user.id !== body.userid) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }

        const { data, error } = await supabase
            .from('characters')
            .insert([
                {
                    owner: body.userid,
                    name: body.charName,
                    gender: body.gender,
                    pronouns: body.pronouns,
                    public: true,
                    description: body.charDesc

                }
            ])
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

