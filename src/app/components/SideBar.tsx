/**
 * @fileoverview This file contains the SideBar component. This component is responsible for rendering the sidebar of the application.
 */
import {Box, Text, ScrollArea} from "@radix-ui/themes";


const SideBar = () => {
    return (
        <Box style={{
            width: '200px',
            height: '50vh',
            backgroundColor: 'black',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem',
            position: 'fixed',
            top: 98,
            left: 0,
            bottom: 100,

        }}>
            <ScrollArea />

            <Text>SideBar</Text>

        </Box>
    );
}

export default SideBar;