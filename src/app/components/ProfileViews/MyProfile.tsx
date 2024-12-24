import React from "react";
import { Box, Text, Badge, Blockquote, Heading } from "@radix-ui/themes";
import CreateSprintDialog from "../commission/Create/CommissionSprint";
import { NewCharacterDialog } from "../Character/CreateCharacterDialog";
import { FaEdit } from "react-icons/fa";
import Dashboard from "./Dashboard";

interface UserProfile {
    is_admin: boolean;
    bio: string;
    username: string;
    email: string;
    pronouns: string;
    gender: string;
    creator: boolean;
    bannerUrl?: string;
}

const ManageProfile: React.FC<UserProfile> = (
    {
        is_admin,
        bio,
        username,
        email,
        pronouns,
        gender,
        creator,
        bannerUrl
    }) => {
    return (
        <Box className="relative">
            {/* Banner Image Section */}
            <Box
                py="9"
                className="relative flex justify-center items-center h-[300px] bg-cover bg-center"
                style={{
                    backgroundImage: `url(${bannerUrl || "public/inktail_logo_1920x500_fixed.png"})`,
                }}
            >
                {/* Gradient overlay */}
                <Box
                    className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"
                    style={{ left: 0, width: "100%" }}
                ></Box>

                {/* Profile Information and Social Links */}
                <Box
                    className="absolute inset-0 flex justify-between items-start p-5 animate-fadeIn"
                    style={{ bottom: "-100px" }}
                >
                    {/* Left Section: Profile Info */}
                    <Box className="flex flex-col">
                        <Text className="text-white text-6xl font-mono">{username}</Text>

                        <Box>
                            <Badge className="mt-0">{creator ? "Creator" : "User"}</Badge>
                        </Box>

                        <Box>
                            <Blockquote className="text-white w-[35%]">{bio}</Blockquote>
                        </Box>

                        <Box>
                            <Text className="text-white text-sm">Pronouns: {pronouns}</Text>
                            <Text className="text-white text-sm">Gender: {gender}</Text>
                            <Badge className="text-white bg-gray-500">
                                {is_admin ? "Admin" : ""}
                            </Badge>
                        </Box>
                        <Box className="mt-4">
                            <CreateSprintDialog />
                            <NewCharacterDialog />
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Dashboard Section Below Profile */}
            <Box className="mt-5 px-40">
                <Dashboard />
            </Box>
        </Box>
    );
};


export default ManageProfile;
