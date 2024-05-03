import { login, signup } from './actions'
import { createClient } from 'app/utils/supabase/server';

import LoginWithDiscordButton from '../components/LoginWithDiscordButton'

const LoginPage: React.FC = async () => {

    return (
        <div>
            <h1>Welcome to InkTail 🦊</h1>
            <p>Commission art and management platform</p>
            <LoginWithDiscordButton />
        </div>
    );
};


export default LoginPage;