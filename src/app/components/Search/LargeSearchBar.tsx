import {Container, TextField} from "@radix-ui/themes";
import { Box } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function LargeSearchBar() {
    return (
        <>
            <Box style={{ borderRadius: 'var(--radius-3)' }}>
                <Container size={"3"}>
                    <Box width="100%" height="100%">
                        <TextField.Root placeholder="Search for an artist, character, or theme... 🦊" size={"3"}
                                        color={"purple"}
                                        variant={"soft"}
                                        style={{ height: "75px"}}
                        >
                            <TextField.Slot>
                                <MagnifyingGlassIcon height="25" width="25" />
                            </TextField.Slot>
                        </TextField.Root>
                    </Box>
                </Container>
            </Box>



        </>


    );
}