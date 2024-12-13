import { createClient } from "../../../utils/supabase/client";
import { verifyToken } from "../../helpers/verifyToken";
import { NextResponse, NextRequest } from "next/server";

const supabase = createClient();

interface Tag {
    id: string;
    name: string;
    description: string;
    mature: boolean;
    popularity: number;
}

export async function GET(req: NextRequest, res: NextResponse) {
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.split(' ')[1] || null;

    try {
        await verifyToken(token);
    } catch (error) {
        console.error(error);
        const errorMessage = (error as Error).message;
        return NextResponse.json({ error: errorMessage }, { status: errorMessage === "No token provided" ? 401 : 403 });
    }

    try {
        // Get all tags in tags table
        const { data, error } = await supabase
            .from('tags')
            .select('*');

        if (error) {
            console.error('Error getting tag:', error);
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }

        const tags: Tag[] = data as Tag[];
        console.log(tags);
        return NextResponse.json({ tags }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}