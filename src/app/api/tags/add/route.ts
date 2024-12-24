import { NextResponse, NextRequest } from "next/server";
import withAuth from "../../middleware/withAuth";

interface Tag {
    id: number;
    name: string;
    mature: boolean;
    description?: string;
}

/**
 * Endpoint consumes a POST request to add a new tag to the tags table
 * @param req
 * @param res
 * @constructor
 */


export const POST = withAuth(async (req, { authenticatedUser, supabase }) => {
    try {
        // Read the request body and parse the tag name
        const requestBody = await req.text();
        if (!requestBody) {
            return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
        }

        const body = JSON.parse(requestBody);
        const tagName = body.tag_name;
        const mature = body.mature;
        const description = body.description;
        const newTag = { tagName, mature, description };

        // Insert new tag into tags table
        const { data, error } = await supabase
            .from('tags')
            .insert([{ tag_name: tagName, mature: mature, description: description }])
            .select();

        if (error) {
            console.error('Error inserting tag:', error);
            return NextResponse.json({ error: error }, { status: 400 });
        }

        console.log(data);
        return NextResponse.json({ newTag }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
});