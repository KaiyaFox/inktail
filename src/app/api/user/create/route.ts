// Create a user using Supabase Auth

import { createClient } from "@supabase/supabase-js";
import { NextResponse, NextRequest } from "next/server";
import { check, validationResult } from "express-validator";
// Create a new Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

// User interface
interface User {
  email: string;
  password: string;
  displayname: string;
  role?: string;
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
    // Create a new user object
    const newUser: User = {
      email: body.email,
      password: body.password,
      displayname: body.username,
      role: body.role,
    };
    // Validate the user
    await validateUser(req); // This calls the validateUser function

    // Create a new user
    const { data, error } = await supabase.auth.signUp({
      email: newUser.email,
      password: newUser.password,
      // displayname: newUser.displayname,
    });
    return NextResponse.json({ message: data, error });
  } catch (error) {
    console.error("Error in POST request", error);
    return NextResponse.json({ message: "POST request failed" });
  }
}
