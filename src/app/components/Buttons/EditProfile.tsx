import React from "react";
import { Box, Button } from "@radix-ui/themes";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {Dialog} from "@radix-ui/themes";
import { FaEllipsisV } from "react-icons/fa";
import { FaEllipsis } from "react-icons/fa6";
import TriggerIcon from "@radix-ui/themes/dist/cjs/components/dropdown-menu";
import { Share1Icon} from "@radix-ui/react-icons";
import LogoutButton from "./Logout";


// Todo: Add functionality to edit profile information
const EditProfileButton: React.FC = () => {

    const HandleBannerImage = () => {
        console.log("Edit Banner Image");
    }

    const HandleProfileInfo = () => {
        console.log("Edit Profile Information");
    }

    const HandleAccountSettings = () => {
        console.log("Open Account Settings");
    }

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Button variant="ghost">
                    Edit
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="bg-purple-900 rounded-md shadow-lg p-2 w-56"
            style={{zIndex: 50}}>
                <DropdownMenu.Item className="p-2 text-sm hover:bg-purple-800 rounded cursor-pointer" onClick={HandleBannerImage} >
                    Edit Banner Image
                </DropdownMenu.Item>
                <DropdownMenu.Item className="p-2 text-sm hover:bg-purple-800 rounded cursor-pointer" onClick={HandleProfileInfo}>
                    Edit Profile Information
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="my-2 h-px bg-gray-200" />
                <DropdownMenu.Item className="p-2 text-sm hover:bg-purple-800 rounded cursor-pointer" onClick={HandleAccountSettings}>
                    Account Settings
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export default EditProfileButton;
