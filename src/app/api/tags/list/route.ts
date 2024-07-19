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

export async function GET(req: NextRequest, res: NextResponse) {
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];
    try {
        try {
            await verifyToken(token);
        } catch (error) {
            console.error(error);
            return NextResponse.json({error: error.message}, {status: error.message === "No token provided" ? 401 : 403});
        }


        // Get all tags in tags table
        const { data, error } = await supabase
            .from('tags')
            .select('*')
        if (error) {
            console.error('Error getting tag:', error);
            return NextResponse.json({error: "Invalid input"}, {status: 400})

        }
        const tag: Tag = data;
        console.log(data)
        return NextResponse.json({tag}, {status: 200})
    } catch (e) {
        console.error(e)
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    }
}