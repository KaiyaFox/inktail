import { login, signup } from './actions'

import LoginWithDiscordButton from '../components/LoginWithDiscordButton'

const LoginPage: React.FC = async () => {

    return (
        <div>
            <LoginWithDiscordButton />
        </div>
    );
};


export default LoginPage;