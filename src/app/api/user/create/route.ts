// Create a user using Supabase Auth

import { createClient } from "@supabase/supabase-js";
import { NextResponse, NextRequest } from "next/server";
import { check, validationResult } from "express-validator";
// Create a new Supabase client
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

// User interface
interface User {
  email?: string;
  pronouns?: string;
  gender?: string;
  password?: string;
  bio?: string;
  onboarding?: boolean;
  username: string;
  creator?: boolean;
  role?: string;
  nsfwFilter?: true;
}

const validateUser = async (req: NextRequest) => {
  // Validate the request body validation chain
  //   await check("email", "Email is required").isEmail().run(req);
  //   await check("password", "Password is required").isLength({ min: 6 }).run(req);
  //   await check("username", "Username is required").isLength({ min: 1 }).run(req);
  //   await check("role", "Role is required").isLength({ min: 1 }).run(req);
  //   await check("role").isIn(["admin", "user"]).run(req);

  console.log("Validation errors:", validationResult(req));
  const inputErrors = validationResult(req);
  if (!inputErrors.isEmpty()) {
    throw new Error(
      `Validation failed: ${JSON.stringify(inputErrors.array())}`
    );
  }
};

// Create a new user

export async function POST(req: NextRequest) {
  try {
    // Log the entire request body received
    console.log("Request Body:", req.body);
    const body = await req.json();
    console.log("Request Body:", body);

    // Extract userId from the request body
    const userId = body.userId;
    console.log("User ID in ROUTE:", userId);

    // Check if the user already exists
    const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('id', userId)
        .single();

    if (checkError) {
      console.error("Error checking user existence:", checkError);
      return NextResponse.json({ message: "Error checking user existence" });
    }

    if (!existingUser) {
      return NextResponse.json({ message: "User does not exist" });
    }

    // Create a new user object
    const newUser: User = {

      username: body.username,
      pronouns: body.pronouns,
      gender: body.gender,
      bio: body.bio,
      creator: body.creator,
      nsfwFilter: body.nsfwFilter,
      onboarding: body.onboarding,

    };

    // Validate the user
    await validateUser(req);

    // Update user's name in the users table in the database
    const { data, error } = await supabase
        .from('users')
        .update(newUser)
        .eq('id', userId);

    return NextResponse.json({ message: data, error });
  } catch (error) {
    console.error("Error in POST request", error);
    return NextResponse.json({ message: "POST request failed" });
  }
}
