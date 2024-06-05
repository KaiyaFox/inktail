import path from 'path';
import fs from 'fs';
import { NextResponse, NextRequest } from "next/server";


export function GET(req: NextRequest, res: NextResponse) {
  try {

    console.log('Getting TOS...');
    const filePath = path.join(process.cwd(), '/TOS.md');

    // Read file
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Send a response
    return NextResponse.json({fileContent})
  } catch (error) {
    console.error('Error in GET request', error);
    return NextResponse.json({error: 'Error loading TOS'});
  }

}
