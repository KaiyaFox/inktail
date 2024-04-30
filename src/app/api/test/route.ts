import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(res: NextApiResponse, req: NextApiRequest) {
  try {
    console.log("Inside GET request");
    console.log(res);

    return NextResponse.json({ message: "GET request successful" });
  } catch (error) {
    console.error("Error in GET request", error);
    return NextResponse.json({ message: "GET request failed" });
  }
}
