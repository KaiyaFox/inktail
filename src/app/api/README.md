# API Overview
We use Next.js APP router to create a RESTful API. The API is organized into routes, each of which is a directory in 
`src/app/api`. Each route has a `route.ts` file.
Check Next.js documentation for more information on how to create routes.

All endpoints are prefixed with `/api`.

The API uses middleware found at `src/app/api/middleware` to handle authentication and authorization. In addition, 
a higher order function is used to wrap each route handler to catch any errors that occur during the request/response cycle.

## Create a new endpoint

To create a new endpoint, follow these steps:

1. Create a new directory in `src/app/api/<name-of-route>/route.ts`. For example, if you are creating an endpoint called 
   `users`, create a new directory called `users` in `src/app/api` then create a route.ts file. The file structure would look like: `src/app/api/users/route.ts`
2. Use Middleware: Most endpoints should use middleware unless they are public endpoints. To implement the custom middleware, 
you simply import withAuth from `src/app/api/middleware/withAuth` and use it to wrap the handler function with the middleware as show:
    ```typescript
   import { NextResponse, NextRequest } from "next/server";
   import withAuth from "../middleware/withAuth"; // Import the withAuth wrapper

   export const GET = withAuth(async (req, { user, supabase }) => {
   
   // Log the entire request body received
    const body = await req.json();
    console.log("Request Body:", body);
    
    return NextResponse.json({ message: data }, { status: 200 });
   });
    ```
   
The `withAuth` wrapper will handle the authentication and authorization for the endpoint. There should be no reason you need to 
write any additional code to handle authentication and authorization.
So all you need to do is to write your logic in the handler function. 
