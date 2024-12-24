'use client';
// Admin page to display debug information and manage the application.

import React from 'react';
import {Text, Box, Heading, Button} from "@radix-ui/themes";

export default function APIPage() {
    return (
        <div>

            <Box display={"block"} width="150px" height="150px">
                <Heading size={'6'}>API Page</Heading>
                <Text>Welcome to the API page!</Text>
            </Box>

        </div>
    );
}