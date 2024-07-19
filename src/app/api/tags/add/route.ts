import { createClientWithToken } from "../../../utils/supabase/client"
import { verifyToken } from "../../helpers/verifyToken";
import { NextResponse, NextRequest } from "next/server";
import {string} from "yup";
import {insert} from "formik";

interface Tag {
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
export async function POST(req: NextRequest, res: NextResponse) {
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];
    // Create a supabase client with the token provided
    const supabase = createClientWithToken(token);

    // Verify the token by calling the verifyToken function
    try {
        await verifyToken(token);
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: error.message}, {status: error.message === "No token provided" ? 401 : 403});
    }

    try {

        // Read the request body and parse the tag name
        const requestBody = await req.text();
        console.log('request body: ', requestBody)
        const body = JSON.parse(requestBody)
        const tagName = body.tag_name;
        const mature = body.mature;
        const description = body.description;
        const newTag = {tagName, mature, description}

        // TODO: Cant figure out how to authenticate the user to write to database with RLS policy.
        // Insert new tag into tags table
        const {data, error} = await supabase
            .from('tags')
            .insert([{tag_name: tagName, mature: mature, description: description}])
            .select()

        if (error) {
            console.error('Error inserting tag:', error);
            return NextResponse.json({error: error}, {status: 400})
        }

        console.log(data)
        return NextResponse.json({newTag}, {status: 200})
    } catch (e) {
        console.error(e)
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    }
}