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
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Input validation schema
const validationSchema = Yup.object({
    charName: Yup.string()
        .required('A character name is required')
        .min(3, 'Character name must be at least 3 characters')
        .max(30, 'Character name cannot be more than 30 characters'),
    charDesc: Yup.string()
        .required('A character description is required')
        .min(10, 'Description must be at least 10 characters')
        .max(1000, 'Description cannot be more than 1000 characters'),
});

export const NewCharacterDialog = () => {
    const initialValues = {
        charName: '',
        charDesc: '',
        charSpecies: '',
        gender: '',
        pronouns: '',
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

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>Create new character</Button>
            </Dialog.Trigger>
            <Dialog.Content maxWidth="800px" size="4">
                <Dialog.Title>Creating New Character</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Create a new character to store in your InkTail account.
                </Dialog.Description>
                <Container>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log(values);
                            localStorage.setItem('newCharacter', JSON.stringify(values));
                        }}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
                            <Form>
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
                                                    Fill out the form below to create a new character. After filling out all required information and clicking the Create button,
                                                    you can visit the My Characters page on your profile to update or add more information to your character such as background, personality, etc.
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
                                                         fallback={''}/>

                                                        <DataList.Root style={{ flex: 1 }}>
                                                            <DataList.Item style={{ display: 'flex', alignItems: 'center' }}>
                                                                <DataList.Label minWidth="88px">Name</DataList.Label>
                                                                <Field
                                                                    as={TextField.Root}
                                                                    name="charName"
                                                                    color="purple"
                                                                    variant="soft"
                                                                    radius="full"
                                                                    placeholder="Character Name"
                                                                    style={{ flex: 1 }}
                                                                />
                                                                {errors.charName && touched.charName && (
                                                                    <Box style={{ alignSelf: 'flex-end' }}>
                                                                        <Text color="red">{errors.charName}</Text>
                                                                    </Box>
                                                                )}
                                                            </DataList.Item>
                                                            <DataList.Item style={{ display: 'flex', alignItems: 'center' }}>
                                                                <DataList.Label minWidth="88px">Species</DataList.Label>
                                                                <Field
                                                                    as={TextField.Root}
                                                                    name="charSpecies"
                                                                    color="purple"
                                                                    variant="soft"
                                                                    radius="full"
                                                                    placeholder="Character Species"
                                                                    style={{ flex: 1 }}
                                                                />
                                                            </DataList.Item>
                                                            <DataList.Item style={{ display: 'flex', alignItems: 'center' }}>
                                                                <DataList.Label minWidth="88px">Gender</DataList.Label>
                                                                <Field
                                                                    as={Select.Root}
                                                                    name="gender"
                                                                    value={values.gender}
                                                                    onValueChange={(value) => setFieldValue('gender', value)}
                                                                >
                                                                    <Select.Trigger />
                                                                    <Select.Content>
                                                                        <Select.Group>
                                                                            <Select.Item value="none" disabled>Gender</Select.Item>
                                                                            <Select.Item value="None">None</Select.Item>
                                                                            <Select.Item value="Female">Female ♀</Select.Item>
                                                                            <Select.Item value="Male">Male ♂</Select.Item>
                                                                            <Select.Item value="Non-Binary">Non-Binary ⚧</Select.Item>
                                                                        </Select.Group>
                                                                    </Select.Content>
                                                                </Field>
                                                            </DataList.Item>
                                                            <DataList.Item style={{ display: 'flex', alignItems: 'center' }}>
                                                                <DataList.Label minWidth="88px">Pronouns</DataList.Label>
                                                                <Field
                                                                    as={Select.Root}
                                                                    name="pronouns"
                                                                    value={values.pronouns}
                                                                    onValueChange={(value) => setFieldValue('pronouns', value)}
                                                                >
                                                                    <Select.Trigger />
                                                                    <Select.Content>
                                                                        <Select.Group>
                                                                            <Select.Item value="none" disabled>Pronouns</Select.Item>
                                                                            <Select.Item value="None">None</Select.Item>
                                                                            <Select.Item value="Female">She/Her</Select.Item>
                                                                            <Select.Item value="Male">He/Him</Select.Item>
                                                                            <Select.Item value="Non-Binary">They/Them</Select.Item>
                                                                        </Select.Group>
                                                                    </Select.Content>
                                                                </Field>
                                                            </DataList.Item>
                                                            <DataList.Item style={{ display: 'flex', alignItems: 'center' }}>
                                                                <DataList.Label minWidth="88px">About</DataList.Label>
                                                                <Field
                                                                    as={TextArea}
                                                                    name="charDesc"
                                                                    resize="vertical"
                                                                    maxLength={400}
                                                                    color="purple"
                                                                    variant="soft"
                                                                    radius="full"
                                                                    placeholder="Description max 400 characters"
                                                                    style={{ flex: 1 }}
                                                                />
                                                                {errors.charDesc && touched.charDesc && (
                                                                    <Text color="red">{errors.charDesc}</Text>
                                                                )}
                                                            </DataList.Item>
                                                        </DataList.Root>
                                                    </Flex>
                                                </Card>
                                            </Box>
                                        </Tabs.Content>

                                        {/* Other tabs here, similarly refactored */}

                                    </Box>
                                </Tabs.Root>
                                <Flex gap="3" mt="4" justify="end">
                                    <Dialog.Close>
                                        <Button variant="soft" color="gray">
                                            Cancel
                                        </Button>
                                    </Dialog.Close>
                                    <Button type="submit">Create</Button>
                                </Flex>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </Dialog.Content>
        </Dialog.Root>
    );
};
