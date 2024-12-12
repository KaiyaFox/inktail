'use client';
import react from 'react';
import UserDataContext from "./userDataContext";
import {number} from "yup";

/**
 * This context provider is used to store and pass down user data to the components that request it.
 * This is useful for components that need to know the user's session, user data, or other user-related information.
 *
 * */
const UserProvider = ({children}) => {
    const [user, setUser] = react.useState(null);
    const [username, setUsername] = react.useState('');
    const [session, setSession] = react.useState(null);
    const [isOnboarded, setIsOnboarded] = react.useState<boolean>();
    const [userId, setUserId] = react.useState('');
    const [avatarUrl, setAvatarUrl] = react.useState('');
    const [email, setEmail] = react.useState('');
    const [admin, setAdmin] = react.useState(false);
    const [provider, setProvider] = react.useState('');
    const [mature, setMature] = react.useState<boolean>(false);
    const [userProfile, setUserProfile] = react.useState(
        {
            userSession: '',
            userId: '',
            username: '',
            email: '',
            avatarUrl: '',
            admin: false,
            moderator: false,
            warning: number,
            provider: '',
            mature: false,
            creator: false,
            pronouns: '',
            gender: '',
            bio: '',
            twitch: '',
            twitter: '',
        });

    return (
        <UserDataContext.Provider
            value={

            {
                user, setUser,
                session, setSession,
                isOnboarded, setIsOnboarded,
                userId, setUserId,
                avatarUrl, setAvatarUrl,
                email, setEmail,
                admin, setAdmin,
                provider, setProvider,
                mature, setMature,
                userProfile, setUserProfile,
                username, setUsername,
                // userProfile, setUserProfile,

            }
                }
        >
            {children}
        </UserDataContext.Provider>
    );
}

export default UserProvider;