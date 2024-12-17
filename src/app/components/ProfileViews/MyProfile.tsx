

import react from "react";
import {Box, Text, Badge, Blockquote, Tabs} from "@radix-ui/themes";
import CreateSprintDialog from "../commission/Create/CommissionSprint";
import React from "react";
import CreateNew from "../commission/CreateNew";
import {NewCharacterDialog} from "../Character/CreateCharacterDialog";

interface UserProfile {
    is_admin: boolean;
    bio: string;
    username: string;
    email: string;
    pronouns: string;
    gender: string;
    creator: boolean;
}


/**
 * This component is the view for the users profile if the user is viewing their own profile.
 * It displays the users information and allows them to edit it.
 */
const ManageProfile: React.FC <UserProfile> = ({is_admin, bio, username, email, pronouns, gender, creator}) => {
    return (
        <Box
            py="9"
            style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 'var(--radius-3)',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
            }}
        >
            <Box
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: -100,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                    animation: 'fadeIn 3.0s',
                }}
            >
                <>
                    <Text style={{ color: 'white', fontSize: '24px' }}>{username}</Text>
                    <Blockquote>
                        {bio}
                    </Blockquote>
                    <Text style={{ color: 'white', fontSize: '18px' }}>{email}</Text>
                    <Text style={{ color: 'white', fontSize: '16px' }}>Pronouns: {pronouns}</Text>
                    <Text style={{ color: 'white', fontSize: '16px' }}>Gender: {gender}</Text>
                    <Text style={{ color: 'white', fontSize: '16px' }}>Creator: {creator}</Text>
                    <Badge color={'gray'}>Admin{is_admin}</Badge>

                    <Badge>{creator}</Badge>
                    {/* Add more fields as needed */}

                    <CreateSprintDialog />
                    <NewCharacterDialog />


                </>
            </Box>
        </Box>




    );
}

export default ManageProfile;
