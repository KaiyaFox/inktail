import React from "react";
import { useState } from "react";
import { Box, Button, Dialog } from "@radix-ui/themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FaEllipsisV } from "react-icons/fa";
import { FaEllipsis } from "react-icons/fa6";
import { Share1Icon} from "@radix-ui/react-icons";
import LogoutButton from "./Logout";
import FileUploader from "../Uploader/FileUploader";
import { createClient } from "../../utils/supabase/client";


// Todo: Add functionality to edit profile information
const EditProfileButton: React.FC = () => {
    const [isBannerDialogOpen, setBannerDialogOpen] = useState(false);
    const [isProfileDialogOpen, setProfileDialogOpen] = useState(false);



    const HandleBannerImage = () => {
        console.log("Edit Banner Image");
        setBannerDialogOpen(true);
    }

    const HandleProfileInfo = () => {
        console.log("Edit Profile Information");
        setProfileDialogOpen(true);

        // Update user's data in the users table in the databas
        const HandleUpdate = () => {
            console.log("Update Profile Information");
        }


    }

    const HandleAccountSettings = () => {
        console.log("Open Account Settings");
    }

    return (
        <><DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Button variant="ghost">
                    Edit
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="bg-purple-900 rounded-md shadow-lg p-2 w-56"
                                  style={{zIndex: 50}}>
                <DropdownMenu.Item className="p-2 text-sm hover:bg-purple-800 rounded cursor-pointer"
                                   onClick={HandleBannerImage}>
                    Edit Banner Image
                </DropdownMenu.Item>
                <DropdownMenu.Item className="p-2 text-sm hover:bg-purple-800 rounded cursor-pointer"
                                   onClick={HandleProfileInfo}>
                    Edit Profile Information
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="my-2 h-px bg-gray-200"/>
                <DropdownMenu.Item className="p-2 text-sm hover:bg-purple-800 rounded cursor-pointer"
                                   onClick={HandleAccountSettings}>
                    Account Settings
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>

            <Dialog.Root open={isBannerDialogOpen} onOpenChange={setBannerDialogOpen}>
                <Dialog.Content>
                    <Dialog.Title>Account Settings</Dialog.Title>
                    <Dialog.Description>
                        Upload a new banner image for your profile.
                        <FileUploader bucketName="users"  />
                    </Dialog.Description>
                    <Button onClick={() => setBannerDialogOpen(false)}>Close</Button>
                </Dialog.Content>
            </Dialog.Root>

            <Dialog.Root open={isProfileDialogOpen} onOpenChange={setProfileDialogOpen}>
                <Dialog.Content>
                    <Dialog.Title>Edit Your Profile Information</Dialog.Title>
                    <Dialog.Description>
                        Edit your profile information.
                    </Dialog.Description>
                    <Button onClick={() => setProfileDialogOpen(false)}>Update</Button>
                    <Button onClick={() => setProfileDialogOpen(false)}>Cancel</Button>
                </Dialog.Content>
            </Dialog.Root>
        </>
    );
};

export default EditProfileButton;
