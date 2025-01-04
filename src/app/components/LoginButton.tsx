import React from "react";
import {Button} from "@radix-ui/themes";
import { useRouter } from 'next/navigation';

const LoginButton: React.FC = () => {
    const router = useRouter();
    // Push to login page
    const handleClick = () => {
        router.push('/login');

    };
    return (
    <Button variant="ghost" onClick={handleClick}>
        Login
    </Button>
    );
}

export default LoginButton;