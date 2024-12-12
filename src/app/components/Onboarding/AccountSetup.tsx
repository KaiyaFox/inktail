import React, { useState, useEffect } from 'react';
import userDataContext from "../../../contexts/userDataContext";
import { FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import { debounce } from 'lodash';
import { TextField, Select, Text, Container, Box, Button, Heading, Separator, RadioGroup, CheckboxCards, Flex } from "@radix-ui/themes";

const AccountSetup = () => {
    const [usernameAvailable, setUsernameAvailable] = useState(true);
    const { user, setUser, session } = React.useContext(userDataContext);

    // Content Type options. Add more as needed
    const contentType = {
        digital: 'Art created digitally using tablets, and art software.',
        traditional: 'Art created with traditional paint, canvases, brushes, pencils.',
        textile: 'Clothing or costumes.',
        model: 'Figurines, miniatures, statues and other 3D creations.',
        animation: 'Animated art that can be 3D or 2D renders, VR Avatars, or GIF.',
        photography: 'Still life photos, motion pictures or videos.',
        music: 'Music, sound effects, or audio recordings.',
        literature: 'Written works, poetry, stories, or scripts.',
    };

    // Debounced check for username availability
    const checkUsernameAvailability = debounce(async (username) => {
        // Replace with actual API call
        console.log(`Checking availability for: ${username}`);
        // Simulate API call
        setUsernameAvailable(true); // Set based on API response
    }, 500);

    const handleCheckedChange = (mediaType, arrayHelpers) => (e) => {
        if (e.target.checked) {
            arrayHelpers.push(mediaType);
        } else {
            const idx = arrayHelpers.form.values.content.indexOf(mediaType);
            arrayHelpers.remove(idx);
        }
    }

    // Move the useEffect logic here to access formik values
    useEffect(() => {
        if (Formik.name === 'username') {
            checkUsernameAvailability(Formik.name);
        }
    }, [Formik.name]);

    return (
        <Box>
            <Formik
                initialValues={{
                    username: '',
                    species: '',
                    gender: '',
                    content: [''],
                    creator: false,
                    tos_agree: false,
                }}
                validationSchema={Yup.object({
                    username: Yup.string()
                        .required('Username is required')
                        .min(3, 'Username must be at least 3 characters')
                        .max(20, 'Username cannot be more than 20 characters')
                        .matches(/^[a-zA-Z0-9_]*$/, 'Username can only contain letters, numbers, and underscores'),
                    species: Yup.string()
                        .oneOf(['Canine', 'Feline', 'Equine', 'Human', 'Other']),
                    gender: Yup.string()
                        .oneOf(['Female', 'Male', 'Non-binary']),
                    content: Yup.string()
                        .oneOf(['digital_art', 'traditional_art', 'video', 'animation', 'model', 'textile', 'photography', 'music'])
                        .required('Content type is required'),
                    creator: Yup.boolean()
                        .required('You must select if you want to be a creator or not'),
                    tos_agree: Yup.boolean()
                        .required('You must read and agree to the terms of service to continue')
                        .oneOf([true], 'You must read and agree to the terms of service to continue'),
                })}
                onSubmit={values => {
                    console.log(values);
                    // Submit form values
                }}
            >
                {formik => {

                    return (
                        <form onSubmit={formik.handleSubmit}>
                            <Container size={"1"}>
                                <Heading size={"8"} align={"center"} mt={"5"}>
                                    Create your InkTail account
                                </Heading>
                                <Separator my={"5"} size={"4"} />
                                <Text size={"3"} align="center" as={"div"} mb={"5"}>
                                    Let&apos;s get you set up with an account
                                </Text>
                                <Text>Enter a username</Text>
                                <TextField.Root
                                    size={"3"}
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.username}
                                />
                                {!usernameAvailable && <div>Username is taken</div>}
                                <Text>Select your gender</Text>
                                <br></br>
                                <Select.Root size={"3"} defaultValue="none">
                                    <Select.Trigger />
                                    <Select.Content>
                                        <Select.Group>
                                            <Select.Item value="none" disabled>Select your gender</Select.Item>
                                            <Select.Item value="Female">Female ♀</Select.Item>
                                            <Select.Item value="Male">Male ♂</Select.Item>
                                            <Select.Item value="Non-Binary">Non-Binary ⚧</Select.Item>
                                        </Select.Group>
                                    </Select.Content>
                                </Select.Root>
                                <RadioGroup.Root size={"3"} defaultValue={'none'} name={"creator"}>
                                    <Text>Are you a creator?</Text>
                                    <RadioGroup.Item value="yes">Yes</RadioGroup.Item>
                                    <RadioGroup.Item value="no">No</RadioGroup.Item>
                                </RadioGroup.Root>
                                <FieldArray
                                    name="content"
                                    render={arrayHelpers => (
                                        <CheckboxCards.Root columns={{ initial: "1", sm: '1' }}>
                                            {Object.keys(contentType).map((mediaType) => (
                                                <CheckboxCards.Item
                                                    key={mediaType}
                                                    value={mediaType}
                                                    id={mediaType}
                                                    onChange={handleCheckedChange(mediaType, arrayHelpers)}
                                                >
                                                    <Flex direction="column" width="100%" align={"start"}>
                                                        <Text size={'5'} weight="bold">{mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}</Text>
                                                        <Text>{contentType[mediaType]}</Text>
                                                    </Flex>
                                                </CheckboxCards.Item>
                                            ))}
                                        </CheckboxCards.Root>
                                    )}
                                />
                                <Separator my={"5"} size={"4"} />
                                <Button size={"4"} type="submit">Create my account</Button>
                            </Container>
                        </form>
                    );
                }}
            </Formik>
        </Box>
    );
};

export default AccountSetup;