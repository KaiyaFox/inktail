import React from 'react';
import LoginWithDiscordButton from '../components/LoginWithDiscordButton';
import {Box} from "@radix-ui/themes";

const LoginPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-purple-900 p-6 rounded-lg shadow-lg w-96">
                <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
                <p className=" mb-6 text-center">Sign in using your Discord account to continue</p>
                <Box className="flex justify-center">
                <LoginWithDiscordButton />
                </Box>
            </div>
        </div>
    );
};

export default LoginPage;
