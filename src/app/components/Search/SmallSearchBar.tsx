import {Container, TextField} from "@radix-ui/themes";
import { Box } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function SmallSearchBar() {
    return (
        <>
            <Box style={{ borderRadius: 'var(--radius-3)' }}>
                <Container size={"4"}>
                    <Box width="100%" height="100%">
                        <TextField.Root placeholder="Search for an artist, character, or theme... 🦊" size={"2"}
                                        color={"pink"}
                                        variant={"soft"}
                        >
                            <TextField.Slot>
                                <MagnifyingGlassIcon height="20" width="20" />
                            </TextField.Slot>
                        </TextField.Root>
                    </Box>
                </Container>
            </Box>



        </>


    );
}