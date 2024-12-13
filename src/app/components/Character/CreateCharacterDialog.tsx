import {
    Heading,
    Text,
    Flex,
    Dialog,
    Button,
    TextField,
    Box,
    Tabs,
    TextArea,
    Container,
    Avatar,
    Card,
    Separator,
    Strong,
    Badge,
    Tooltip,
    DataList,
    Link,
    IconButton,
    Code, Select,
    Callout,

} from "@radix-ui/themes";
import {CopyIcon, InfoCircledIcon} from "@radix-ui/react-icons";
import React from "react";
import FileUploader from "../Uploader/FileUploader";
import ToolTip from "../ToolTip";
import { ChromePicker } from 'react-color';
import { Formik } from "formik";
import * as Yup from "yup";
import {Strait} from "next/dist/compiled/@next/font/dist/google";


// Input validation schema
const validationSchema = Yup.object({
    charName: Yup.string()
        .required('A character name is required')
        .min(3, 'Character name must be at least 3 characters')
        .max(25, 'Character name cannot be more than 25 characters'),
    charDesc: Yup.string()
        .max(400, 'Description cannot be more than 400 characters')
        .required('A character description is required'),
})




export const NewCharacterDialog = () => {
    const [charName, setCharName] = React.useState('');
    const [charDesc, setCharDesc] = React.useState('');
    const [charSpecies, setCharSpecies] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [height, setHeight] = React.useState('');
    const [build, setBuild] = React.useState('');
    const [furScales, setFurScales] = React.useState('');
    const [eyes, setEyes] = React.useState('');
    const [ears, setEars] = React.useState('');
    const [tail, setTail] = React.useState('');
    const [markings, setMarkings] = React.useState('');
    const [clothingAccessories, setClothingAccessories] = React.useState('');
    const [distinctiveFeatures, setDistinctiveFeatures] = React.useState('');
    const [primaryColor, setPrimaryColor] = React.useState('#ffffff');
    const [secondaryColor, setSecondaryColor] = React.useState('#ffffff');


    const initialValues = {
        charName: '',
        charDesc: '',
        charSpecies: '',
        gender: '',
        height: '',
        build: '',
        furScales: '',
        eyes: '',
        ears: '',
        tail: '',
        markings: '',
        clothingAccessories: '',
        distinctiveFeatures: '',
        primaryColor: '#ffffff',
        secondaryColor: '#ffffff',
    };

    // Load state
    const loadSavedState = () => {
        const savedState = localStorage.getItem('newCharacter');
        return savedState ? JSON.parse(savedState) : initialValues;
    };


    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>Create new character</Button>
            </Dialog.Trigger>
            <Dialog.Content maxWidth="800px" size="4">
                <Dialog.Title>Creating New Character - {charName}</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Create a new character to store in your InkTail account.
                </Dialog.Description>
                <Container>










                    <Tabs.Root defaultValue="CharProfile">
                        <Tabs.List>
                            <Tabs.Trigger value="CharProfile">Basic Profile</Tabs.Trigger>
                            <Tabs.Trigger value="PhysicalAppearance">Physical Appearance</Tabs.Trigger>
                            <Tabs.Trigger value="documents">Reference Sheet</Tabs.Trigger>
                            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                        </Tabs.List>
                        <Box pt="3">
                            <Tabs.Content value="CharProfile">
                                <Callout.Root>
                                <Callout.Icon>
                                    <InfoCircledIcon />
                                </Callout.Icon>
                                <Callout.Text>
                                    Fill out the form below to create a new character. After filling out all required informatio and clicking the Create button,
                                    you can visit the My Characters page on your profile to update or add more information to your character such as background, personality etc.
                                    Once you have created a character, you can submit them to creators for commissions.
                                </Callout.Text>
                            </Callout.Root>

                                <Box maxWidth="100%">
                                    <Card>
                                        <Flex gap="4" align="center">
                                            <Avatar
                                                size="9"
                                                src="https://static1.e926.net/data/e8/36/e8361ddfb9c85650eea485398098f7d2.jpg"
                                                radius="none"
                                                fallback={charName}
                                            />

                                            <DataList.Root style={{ flex: 1 }}>
                                                <DataList.Item style={{ display: 'flex', alignItems: 'center' }}>
                                                    <DataList.Label minWidth="88px">Name</DataList.Label>

                                                    <TextField.Root
                                                        color="purple"
                                                        variant="soft"
                                                        radius="full"
                                                        aria-placeholder="Character Name"
                                                        placeholder="Character Name"
                                                        value={charName}
                                                        onChange={(e) => setCharName(e.target.value)}
                                                        style={{ flex: 1 }}
                                                    />
                                                </DataList.Item>
                                                <DataList.Item style={{ display: 'flex', alignItems: 'center' }}>
                                                    <DataList.Label minWidth="88px">Species</DataList.Label>
                                                    <TextField.Root
                                                        color="purple"
                                                        variant="soft"
                                                        radius="full"
                                                        aria-placeholder="Character Species"
                                                        placeholder="Character Species"
                                                        value={charSpecies}
                                                        onChange={(e) => setCharSpecies(e.target.value)}
                                                        style={{ flex: 1 }}
                                                    />
                                                    <DataList.Value>
                                                        <Badge color="jade" variant="soft" radius="full">
                                                            {charSpecies}
                                                        </Badge>
                                                    </DataList.Value>
                                                </DataList.Item>

                                                <DataList.Item style={{display: 'flex', alignItems: 'center'}}>
                                                    <DataList.Label minWidth="88px">Gender</DataList.Label>
                                                    <div style={{flex: 1}}>
                                                        <Select.Root
                                                            size="3"
                                                            defaultValue="none"
                                                            value={gender}
                                                            onValueChange={(value) => setGender(value)}
                                                        >
                                                            <Select.Trigger/>
                                                            <Select.Content>
                                                                <Select.Group>
                                                                    <Select.Item value="none"
                                                                                 disabled>Gender</Select.Item>
                                                                    <Select.Item value="Female">Female ♀</Select.Item>
                                                                    <Select.Item value="Male">Male ♂</Select.Item>
                                                                    <Select.Item value="Non-Binary">Non-Binary
                                                                        ⚧</Select.Item>
                                                                </Select.Group>
                                                            </Select.Content>
                                                        </Select.Root>
                                                    </div>

                                                    <DataList.Label minWidth="88px">Pronouns</DataList.Label>
                                                    <div style={{flex: 1}}>
                                                        <Select.Root
                                                            size="3"
                                                            defaultValue="none"
                                                            value={gender}
                                                            onValueChange={(value) => setGender(value)}
                                                        >
                                                            <Select.Trigger/>
                                                            <Select.Content>
                                                                <Select.Group>
                                                                    <Select.Item value="none"
                                                                                 disabled>Pronouns</Select.Item>
                                                                    <Select.Item value="Female">She/Her</Select.Item>
                                                                    <Select.Item value="Male">He/Him</Select.Item>
                                                                    <Select.Item
                                                                        value="Non-Binary">They/Them</Select.Item>
                                                                </Select.Group>
                                                            </Select.Content>
                                                        </Select.Root>
                                                    </div>
                                                </DataList.Item>
                                                <DataList.Item style={{display: 'flex', alignItems: 'center'}}>
                                                    <DataList.Label minWidth="88px">About</DataList.Label>
                                                    <TextArea
                                                        resize={"vertical"}
                                                        maxLength={400}
                                                        color="purple"
                                                        variant="soft"
                                                        radius="full"
                                                        aria-placeholder="Description"
                                                        placeholder="Description max 400 characters"
                                                        value={charDesc}
                                                        onChange={(e) => setCharDesc(e.target.value)}
                                                        style={{ flex: 1 }}
                                                    />
                                                </DataList.Item>
                                            </DataList.Root>
                                        </Flex>
                                    </Card>
                                </Box>
                            </Tabs.Content>
                            <Tabs.Content value="PhysicalAppearance">
                                <Heading size="5" mb={"3"}>Physical Attributes</Heading>
                                <DataList.Root>
                                    <DataList.Item>
                                        <DataList.Label minWidth="88px">Height</DataList.Label>
                                        <TextField.Root
                                            color="purple"
                                            variant="soft"
                                            radius="full"
                                            aria-placeholder="Height"
                                            placeholder="Height"
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                        />
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.Label minWidth="88px">Build <ToolTip text={"Thin, muscular, chubby, etc."} /></DataList.Label>

                                        <TextField.Root
                                            color="purple"
                                            variant="soft"
                                            radius="full"
                                            aria-placeholder="Build"
                                            placeholder="Build"
                                            value={build}
                                            onChange={(e) => setBuild(e.target.value)}
                                        />
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.Label minWidth="88px">Fur/Scales</DataList.Label>
                                        <TextField.Root
                                            color="purple"
                                            variant="soft"
                                            radius="full"
                                            aria-placeholder="Fur/Scales"
                                            placeholder="Fur/Scales"
                                            value={furScales}
                                            onChange={(e) => setFurScales(e.target.value)}
                                        />
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.Label minWidth="88px">Eyes</DataList.Label>
                                        <TextField.Root
                                            color="purple"
                                            variant="soft"
                                            radius="full"
                                            aria-placeholder="Eyes"
                                            placeholder="Eyes"
                                            value={eyes}
                                            onChange={(e) => setEyes(e.target.value)}
                                        />
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.Label minWidth="88px">Ears</DataList.Label>
                                        <TextField.Root
                                            color="purple"
                                            variant="soft"
                                            radius="full"
                                            aria-placeholder="Ears"
                                            placeholder="Ears"
                                            value={ears}
                                            onChange={(e) => setEars(e.target.value)}
                                        />
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.Label minWidth="88px">Tail</DataList.Label>
                                        <TextField.Root
                                            color="purple"
                                            variant="soft"
                                            radius="full"
                                            aria-placeholder="Tail"
                                            placeholder="Tail"
                                            value={tail}
                                            onChange={(e) => setTail(e.target.value)}
                                        />
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.Label minWidth="88px">Markings</DataList.Label>
                                        <TextField.Root
                                            color="purple"
                                            variant="soft"
                                            radius="full"
                                            aria-placeholder="Markings"
                                            placeholder="Markings"
                                            value={markings}
                                            onChange={(e) => setMarkings(e.target.value)}
                                        />
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.Label minWidth="88px">Clothing and Accessories</DataList.Label>
                                        <TextField.Root
                                            color="purple"
                                            variant="soft"
                                            radius="full"
                                            aria-placeholder="Clothing and Accessories"
                                            placeholder="Clothing and Accessories"
                                            value={clothingAccessories}
                                            onChange={(e) => setClothingAccessories(e.target.value)}
                                        />
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.Label minWidth="88px">Distinctive Features</DataList.Label>
                                        <TextField.Root
                                            color="purple"
                                            variant="soft"
                                            radius="full"
                                            aria-placeholder="Distinctive Features"
                                            placeholder="Distinctive Features"
                                            value={distinctiveFeatures}
                                            onChange={(e) => setDistinctiveFeatures(e.target.value)}
                                        />
                                        <DataList.Item style={{ display: 'flex', alignItems: 'center' }}>
                                            <DataList.Label minWidth="88px">Primary Color</DataList.Label>
                                            <ChromePicker
                                                color={primaryColor}
                                                onChangeComplete={(color) => setPrimaryColor(color.hex)}
                                                disableAlpha

                                            />
                                        </DataList.Item>
                                    </DataList.Item>
                                </DataList.Root>
                            </Tabs.Content>
                            <Tabs.Content value="documents">
                                <Heading size="3">Upload up to 3 reference sheets or illustrations</Heading>
                                <Callout.Root size={"3"} mb={"3"}>
                                    <Callout.Icon>
                                        <InfoCircledIcon />
                                    </Callout.Icon>
                                    <Callout.Text>
                                        Ideally, the images you upload here should be references to what your character should look like or similar.
                                        Images uploaded here will be visible and associated with any commission request you make with this character {charName}
                                    </Callout.Text>
                                </Callout.Root>
                                <FileUploader />
                            </Tabs.Content>
                            <Tabs.Content value="settings">
                                <Text size="2">Adjust settings for {charName ? charName : "Your Character"}</Text>
                            </Tabs.Content>
                        </Box>
                    </Tabs.Root>
                </Container>
                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button>Create</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};
