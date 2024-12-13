import { createClient } from "../../../utils/supabase/client"
import { verifyToken } from "../../helpers/verifyToken";
import { NextResponse, NextRequest } from "next/server";
import {string} from "yup";

const supabase = createClient();

interface Tag {
    id: string;
    name: string;
    description: string;
    mature: boolean;
    popularity: number;
}

export async function POST(req: NextRequest, res: NextResponse) {
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.split(' ')[1] || null;

    try {
        await verifyToken(token);

        const requestBody = await req.text();
        const { id } = JSON.parse(requestBody);
        console.log('id: ', id)

        if (!id) {
            return NextResponse.json({ error: "Tag ID is required" }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('tags')
            .delete()
            .match({ id: id });

        if (error) {
            console.error('Error deleting tag:', error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ message: "Tag deleted successfully", deletedTagId: id }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}