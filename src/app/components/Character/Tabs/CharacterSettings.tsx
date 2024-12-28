import React from "react";
import {Box, Flex, Switch, Text} from "@radix-ui/themes";

const CharacterSettings: React.FC = () => {
    return (
        <Box>
            <h1>Character Settings</h1>
            <p>Settings</p>
            <Text size={"2"}>Public <Switch size={"3"} radius={"full"}  />
            </Text>
            <Text size={"2"}>Allow NSFW <Switch size={"3"} radius={"full"}  />
            </Text>

        </Box>
    );
}

export default CharacterSettings;