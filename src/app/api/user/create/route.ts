/**
 * This route creates a new user in the database, and creates a path in the users bucket for the user's content. Note
 * that this route also creates storage paths for the user in the users storage bucket.
 * @param req The incoming request
 *
 */

import { NextResponse, NextRequest } from "next/server";
import withAuth from "../../middleware/withAuth";


// User interface
interface User {
  userId?: string;
  mediaTypes?: string;
  email?: string;
  pronouns?: string;
  gender?: string;
  password?: string;
  bio?: string;
  onboarding?: true;
  username: string;
  creator?: boolean;
  role?: string;
  nsfwFilter?: boolean;
  tosAgree?: boolean;
}

export const POST = withAuth(async(req, { authenticatedUser, supabase }) => {
  try {
    // Log the entire request body received
    const body = await req.json();
    console.log("Request Body:", body);

    // Extract userId from the request body
    const userId = body.userId;
    console.log("User ID in ROUTE:", userId);

    // Check if the user already exists
    const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('userId')
        .eq('userId', userId)
    //.single();

    if (checkError) {
      console.error("Error checking user existence:", checkError);
      return NextResponse.json({ message: "Error checking user existence" });
    }

    if (!existingUser) {
      return NextResponse.json({ message: `User does not exist or we did not find user: ${userId}` });
    }

    // Create a new user object
    const newUser: User = {

      username: body.username,
      mediaTypes: body.mediaTypes,
      pronouns: body.pronouns,
      gender: body.gender,
      bio: body.bio,
      creator: body.creatorMode,
      nsfwFilter: true, // Always set NSFW content filter to true with new user
      onboarding: true,
      tosAgree: body.tosAgree,

    };

    // Validate the user
    // await validateUser(req);

// Update user's data in the users table in the database
    const { data, error } = await supabase
        .from('users')
        .update(newUser)
        .eq('userId', userId)

    if (error) {
      console.error("Error updating user:", error);
      return NextResponse.json({ message: "Error updating user", error });
    }

    // Create storage paths array
    const storagePaths = [
        `${userId}/characters/`,
        `${userId}/commissions/`,
        `${userId}/uploads/`,
        `${userId}/profile/`,
    ]

    for (const path of storagePaths) {
      const { error: pathError } = await supabase.storage
          .from('users')
          .upload(`${storagePaths}`, 'This is a placeholder file to create the path', {
            upsert: true,
          });
      if (pathError) {
        console.error("Error creating storage path:", pathError);
        return NextResponse.json({ message: "Error creating storage paths", pathError });
      }
    }


    return NextResponse.json({ message: "User updated successfully", data });
  }
  catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Error updating user", error });
  }
})
