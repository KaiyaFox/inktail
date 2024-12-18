"use client"
import React, {useEffect, useContext, useState} from "react";
import {useRouter, useSearchParams, usePathname} from "next/navigation";
import UserDataContext from "../../../contexts/userDataContext";
import {Box, Heading, Skeleton, Text, Section, Button, Container, Link} from "@radix-ui/themes";
import CreateSprintDialog from "../../components/commission/Create/CommissionSprint";
import CreateNewCommission from "../../components/commission/CreateNew";
import ManageProfile from "../../components/ProfileViews/MyProfile";
import CreateNew from "../../components/commission/CreateNew";


interface UserProfile {
    is_admin: boolean;
    username: string;
    email: string;
    pronouns: string;
    gender: string;
    creator: boolean;
    bio: string;
    // Add any other properties you expect to use
}

const UserPage = () => {
    // Get session from global state to use in the fetch request
    const {session} = useContext(UserDataContext); // Destructure the context values you need

    // Local state for the user profile
    // TODO: Ensure profile data contains all relevant user data to be displayed
    const [profile, setProfile ] = useState<UserProfile | null>(null);
    const [notFound, setNotFound] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [owner, setOwner] = useState<boolean>(false);


    // Get id parameters from the URL
    const pathname = usePathname();
    const pathSegments = pathname.split('/'); // Split the pathname to profile segments
    const userIdIndex = pathSegments.findIndex(segment => segment === 'user') + 1; // Find the index of 'user' and add 1 to profile the UUID
    const userId = pathSegments[userIdIndex]; // Get the UUID from the array

    // Fetch user data from the API
    useEffect(() => {
        // Check for session token
        if (session) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`/api/user/profile?id=${userId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${session.access_token}`
                        },
                    });


                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    // Update the user context with the fetched data
                    console.log(data)
                    setProfile(data);
                    console.log('Fetched data:', data);
                    // Check if the user accessing the page the same as the user in the profile using session data
                    if (session.user.id === userId) {
                        setOwner(true);
                    } else {
                        setOwner(false);
                    }
                    // TODO: Fix state variable of owner not setting correctly
                    console.log("ID from path: ", userId)
                    console.log(data.id)
                    console.log('Viewer is Owner:', owner);

                } catch (error) {
                    setNotFound(true);
                    console.error('There was a problem with fetching user profile:', error);
                }

            };
            fetchData().then(() => setLoading(false));
        }
    }, [session, userId, owner]); // Rerun effect if session or userId changes
    if (owner) {
        return (
            <Box>
                <ManageProfile {...profile} />
            </Box>
        );
    }
    return (
        profile ? (
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
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '20px',
                    }}
                >
                    <>
                        <Text style={{ color: 'white', fontSize: '24px' }}>{profile.username}</Text>
                        <Text style={{ color: 'white', fontSize: '18px' }}>{profile.bio}</Text>
                        <Text style={{ color: 'white', fontSize: '18px' }}>{profile.email}</Text>
                        <Text style={{ color: 'white', fontSize: '16px' }}>Pronouns: {profile.pronouns}</Text>
                        <Text style={{ color: 'white', fontSize: '16px' }}>Gender: {profile.gender}</Text>
                        <Text style={{ color: 'white', fontSize: '16px' }}>Creator: {profile.creator.toString()}</Text>
                        {/* Add more fields as needed */}
                    </>
                </Box>
            </Box>
        ) : (
            <Box>
                <Box>
                    {notFound ? (
                        <>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100vh'
                            }}>
                                <Box>
                                    <Container size={"1"} align={"center"}>
                                        <Heading color={'purple'} align={'center'} size={'8'}>404: User Not
                                            Found</Heading>
                                        <Text align={'center'} size={'4'}>Uh-oh, user {userId} was not found</Text>
                                    </Container>
                                    <Box style={{ textAlign: 'center' }} mb={'4'} mt={'4'}>
                                        <Link>
                                            <Button radius={"none"} size={"4"}>Return Home</Button>
                                        </Link>
                                    </Box>
                                </Box>
                            </div>
                        </>

                    ) : (
                        <>
                            <Skeleton/>
                            <Text align={'center'}>Loading...</Text>

                        </>


                    )}
                </Box>
            </Box>

        )
    );
};

export default UserPage;