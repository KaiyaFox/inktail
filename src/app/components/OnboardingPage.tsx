"use client";

// Handle the form submission for setting up a new account
// This component will guide the user through the onboarding process to create a new user account.

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import { useContext } from 'react';
import UserDataContext from '../../contexts/userDataContext';
import { useRouter } from "next/navigation";
import {
    Button,
    TextField,
    Progress,
    Box,
    Select,
    Checkbox,
    Skeleton,
    Spinner,
    Flex,
    Separator,
    ScrollArea,
    Heading,
    Text,
    RadioGroup,
    CheckboxCards
} from "@radix-ui/themes";
import { ArrowRightIcon, ArrowLeftIcon} from "@radix-ui/react-icons";
import * as Yup from "yup";
import { useFormik, FieldArray, FieldArrayRenderProps} from "formik";
import {CreateNewAccount} from "../../app/utils/Helpers/accountHelper";

// Debounce the form validation to prevent spamming the server
function useDebounce(value: string, delay: number): string {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;

}

// Form validation schema for input fields
// TODO: Replace all traditional react forms with Formik forms.
let validationSchema = Yup.object().shape({
    // Username validation
    username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must be less than 20 characters')
        .matches(/^[a-zA-Z0-9_]*$/, 'Username must contain only letters, numbers, and underscores'),
        // .test('unique-username', 'This username is already taken', async (value) => {
        //     if (!value) return false;
        //     try {
        //         // Check if the username is unique
        //         const response = await fetch(`/api/user/username/${value}`);
        //         const data = await response.json();
        //         return data.isUnique;
        //     } catch (error) {
        //         console.error('Failed to check username:', error);
        //         return false;
        //     }
        // }),
    // Media type validation
    media_type: Yup.string()
        .oneOf(['digital', 'traditional', 'textile', 'model'])
        .required('Please select at least one media type'),
    creatorMode: Yup.boolean()
        .required('Please select an option'),
    gender: Yup.string()
        .oneOf(['male', 'female', 'non-binary']),
    tosAgree: Yup.boolean()
        .required('Please agree to the terms and conditions to continue using InkTail')
        .oneOf([true], 'Please agree to the terms and conditions to continue using InkTail'),
});

interface OnboardingProps {
    email: string;
    userId: string;
    provider: string;
    gender: string;
}


const OnboardingPage = () => {
    // Set state variables for the onboarding steps
    const [step, setStep] = useState(1);
    const [disableNext, setDisableNext] = useState(false);
    const [username, setUsername] = useState("");
    const [gender, setGender] = useState("");
    const [creator, setCreator] = useState("false");
    const [commissionPreferences, setCommissionPreferences] = useState([]);
    const [progress, setProgress] = useState(0);
    const [tosAgree, setTosAgree] = useState(false);
    const [onBoarded, setOnBoarded] = useState(false);


    // Formik input validation initialization
    // Set up the formik hook and the validation schema
    const formik = useFormik({
        // Set the type of formik values
        initialValues: {
            username: '',
            mediaTypes: [''],
            gender: '',
            creatorMode: false,
            tosAgree: false,
            // add more fields here
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log('Form data:', values);
        },
    });


    // Calculate the progress of the onboarding steps
    const totalSteps = 4; // Change this when adding more steps

    const incrementProgress = () => {
        setProgress(progress + 100 / totalSteps);
    }

    const decrementProgress = () => {
        setProgress(progress - 100 / totalSteps);
    }
    const nextStep = () => {
        if (step === 2 && creator === "false") {
            console.log('in if statement')

            setStep(step + 2);
            incrementProgress()
            incrementProgress()
        } else {
            console.log('in else statement')
            setStep(step + 1);
            incrementProgress();
        }
    }

    const backStep = () => {
        setStep(step - 1);
        decrementProgress();
    }
    const router = useRouter();

    // Log the state of the onboarding steps and re-render when the state changes
    useEffect(() => {
        // console.log('username:', username);
        // console.log('gender:', gender);
        // console.log('creator:', creator);
        // console.log('commissionPreferences:', commissionPreferences);
        // console.log('step:', step);
        // console.log('progress:', progress);
        console.log('Formik:', formik.values)
    }, [formik.values]);

    return (
        <Box style={{display: 'flex', justifyContent: "center", alignItems: "center", height: '50vh'}} >
            <Box maxWidth="100%">
                <Progress value={progress} size={"3"}/>
            </Box>
            {step === 1 && <CreateUserName
                onNext={nextStep}
                // username={formik.values.username}
                // setUsername={setUsername}
                gender={gender}
                setGender={setGender}
                formik={formik}
                setDisableNext={setDisableNext}
                disableNext={disableNext}
            />}

            {step === 2 && <CreatorMode
                onNext={nextStep}
                onback={backStep}
                // creator={creator}
                // setCreator={setCreator}
                formik={formik}
            />}

            {step === 3 && <ChooseMediaTypes
                onNext={nextStep}
                onback={backStep}
                formik={formik}
            />}

            {step === 4 &&
                <TermsAndConditions
                    onNext={nextStep}
                    onback={backStep}
                    // tosAgree={tosAgree}
                    // setTosAgree={setTosAgree}
                    formik={formik}
                />}
            {step === 5 &&
                <FinalizeAccount
                    onNext={() => router.push('/')}
                    formikValues={formik.values}
                    username={formik.values.username}
                    gender={formik.values.gender}
                    creator={formik.values.creatorMode}
                    commissionPreferences={formik.values.mediaTypes}
                    tosAgree={formik.values.tosAgree} // Lifted state from TermsAndConditions component.

                />}
        </Box>
    );
};

// Onboarding steps

// Step 1: Set a username and profile information
interface CreateUserNameProps {
    onNext: () => void;
    formik: any;
    setDisableNext: React.Dispatch<React.SetStateAction<boolean>>;
    disableNext: boolean;
    gender: string;
    setGender: React.Dispatch<React.SetStateAction<string>>;
}

const CreateUserName: React.FC<CreateUserNameProps> = ({ onNext, formik, setDisableNext, disableNext, gender, setGender }) => {
    // Debouncer for the username input field
    const debouncedUsername = useDebounce(formik.values.username, 6000);

    // Check for errors in formik and disable the next button if there are errors
    useEffect(() => {
        if (debouncedUsername) {
            console.log('Waiting for debounce:', debouncedUsername);
            // TODO: Fix the debouncer
        }
        if (formik.errors.username) {
            setDisableNext(true);
        } else {
            setDisableNext(false);
        }
    }, [setDisableNext, debouncedUsername]);

    return (
        <div>
            <Text align={"center"} as={"div"}>
                <Heading>Welcome to InkTail!</Heading>
            </Text>
            <Text align={"center"} as={"div"} size={"6"}>Lets get started setting up your account.</Text>
            <form onSubmit={formik.handleSubmit}>
                <p>Step 1: Profile Information</p>
                <p>Choose a username</p>
                <label htmlFor="username">Username:</label>
                <TextField.Root
                    type="text"
                    id="username"
                    name="username"
                    placeholder={"Enter a username"}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                />
                {formik.errors.username ? <Text color={"red"} size={"5"}> 😔 {formik.errors.username}</Text> : null}
                <p>Gender</p>
                <Select.Root
                    name="gender"
                    onValueChange={(value) => formik.handleChange({ target: { name: 'gender', value } })}
                    value={formik.values.gender}
                >
                    <Select.Trigger />
                    <Select.Content>
                        <Select.Group>
                            <Select.Label>Gender</Select.Label>
                            <Select.Item value="male">Male</Select.Item>
                            <Select.Item value="female">Female</Select.Item>
                            <Select.Item value="non-binary">Non-binary</Select.Item>
                        </Select.Group>
                    </Select.Content>
                </Select.Root>
                <Flex direction="column" gap="3"></Flex>
                <Box mt={'1'} style={{ display: 'flex', alignItems: 'centers', justifyContent: 'right' }}>
                    <Button type="submit" onClick={onNext} disabled={disableNext}>
                        Next <ArrowRightIcon />
                    </Button>
                </Box>
            </form>
        </div>
    );
};

// Step 2: Determines if the user wants to accept commission requests and use creator options
const CreatorMode = ({onNext, onback: onBack, formik}) => (
    <div>
        <Heading>Step 2: Would you like to accept commission requests on InkTail?</Heading>
        <p>You can always change this later.</p>

        <RadioGroup.Root
            name="creator"
            size={"3"}
            value={formik.values.creatorMode}
            // Using inline function to pass the value to formik
            onValueChange={(value) => formik.handleChange({target: {name: 'creatorMode', value}})}>
            <RadioGroup.Item value="true">Yes</RadioGroup.Item>
            <RadioGroup.Item value="false">No</RadioGroup.Item>
        </RadioGroup.Root>

        <Button type="submit" onClick={onBack}>
            <ArrowLeftIcon/>Back
        </Button>
        <Button type="submit" onClick={onNext}>
            Next<ArrowRightIcon/>
        </Button>
    </div>
);

// Step 3: Choose media types
const ChooseMediaTypes = ({onNext, onback, formik}) => {
    const mediaTypes = {
        digital: 'Art created digitally using tablets, and art software.',
        traditional: 'Art created with traditional paint, canvases, brushes, pencils.',
        textile: 'Clothing or costumes.',
        model: 'Figurines, miniatures, statues and other 3D creations.',
        animation: 'Animated art that can be 3D or 2D renders, VR Avatars, or GIF.',
        photography: 'Still life photos, motion pictures or videos.',
        test: 'Test',
    }
    // TODO: Update formik values when the checkboxes are checked or unchecked.
    const handleCheckedChange = (mediaType: string, arrayHelpers: FieldArrayRenderProps) => () => {
        const isChecked = formik.vales.mediaTypes.includes(mediaType);
        if (!isChecked) {
            arrayHelpers.push(mediaType);
        } else {
            const idx = formik.values.mediaTypes.indexOf(mediaType);
            if (idx !== -1) {
                arrayHelpers.remove(idx);
            }
        }
    }

    return (
        <div>
            <Box width={"50%"}>

                <FieldArray
                    name="mediaTypes"
                    render={arrayHelpers => (
                        <CheckboxCards.Root columns={{initial: "1", sm: '2'}}>
                            {Object.keys(mediaTypes).map((mediaType) => (
                                <CheckboxCards.Item
                                    key={mediaType}
                                    value={mediaType}
                                    id={mediaType}
                                    onChange={handleCheckedChange(mediaType, arrayHelpers)}


                                >
                                    <Flex direction="column" width="100%" align={"start"}>
                                        <Text size={'5'} weight="bold">{mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}</Text>
                                        <Text>{mediaTypes[mediaType]}</Text>
                                    </Flex>
                                    {/* ... */}
                                </CheckboxCards.Item>
                            ))}
                        </CheckboxCards.Root>
                    )}
                />
                <Button type="submit" onClick={onback}>
                    <ArrowLeftIcon/>Back
                </Button>

                <Button type="submit" onClick={onNext}>
                    Next<ArrowRightIcon/>
                </Button>
            </Box>
        </div>

    )
}


// Step 4: Agree to terms and conditions
// Get tos from the server.
const TermsAndConditions = ({onNext, onback, formik}) => {
    // Set state variables for the terms and conditions
    const [loading, setLoading] = useState(true);
    const [tos, setTos] = useState('');
    //TODO: Disable next button if tosAgree is false

    const tosAgree = formik.values.tosAgree;

    useEffect(() => {
        if (tosAgree === true) {
            console.log('tosAgree is true', tosAgree)
        } else {
            console.log('tosAgree is false', tosAgree)
        }
    }, [tosAgree]);


    // Fetch the terms and conditions from the backend server
    useEffect(() => {
        setLoading(true)

        fetch('api/tos/')
            .then(response => response.json())
            .then(data => setTos(data.fileContent));
        setLoading(false)
        // console.log(tos)
    }, []);
    // TODO: Get TOS checkbox state using Formik.
    return (
        <div>
            <h1>Step 4: Terms and Conditions</h1>
            <p>By clicking the button below, you agree to the InkTail terms and conditions</p>
            <br></br>
            <ScrollArea type="always" scrollbars="vertical" style={{height: 500, width: 500}}>
                {loading ? (
                    <Skeleton/>
                ) : (
                    <Box p="2" pr="8">

                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h1: ({node, ...props}) => <h1 style={{color: 'white', fontSize: '3em'}} {...props} />,
                                h2: ({node, ...props}) => <h2 style={{color: 'white', fontSize: '2em'}} {...props} />,
                                h3: ({node, ...props}) => <h3 style={{color: 'blue', fontSize: '1.17em'}} {...props} />,
                                h4: ({node, ...props}) => <h4 style={{color: 'blue', fontSize: '1em'}} {...props} />,
                                h5: ({node, ...props}) => <h5 style={{color: 'blue', fontSize: '.83em'}} {...props} />,
                                h6: ({node, ...props}) => <h6 style={{color: 'blue', fontSize: '.67em'}} {...props} />,
                                li: ({node, ...props}) => <li style={{marginLeft: '20px'}} {...props} />,
                                p: ({node, ...props}) => <p style={{color: 'white'}} {...props} />,
                                a: ({node, ...props}) => <a style={{color: 'blue'}} {...props} />,
                                strong: ({node, ...props}) => <strong style={{color: 'white'}} {...props} />,
                                em: ({node, ...props}) => <em style={{color: 'white'}} {...props} />,
                            }}
                        >
                            {tos}
                        </ReactMarkdown>
                    </Box>
                )}
            </ScrollArea>
            <Text as="label" size="5" >
                <Flex gap="5">
                    <Checkbox
                        name="tosAgree"
                        size={"3"}
                        checked={formik.values.tosAgree}
                        onCheckedChange={(value) => formik.handleChange({target: {name: 'tosAgree', value}})}
                    />
                    <Text>I Agree to Terms and Conditions shown above</Text>



                </Flex>
                <Flex align={'center'}>
                    <Separator orientation={"horizontal"}/>
                </Flex>
                <Text>{formik.errors.tosAgree ? <Text color={"red"} size={"5"}> 😔 {formik.errors.tosAgree}</Text> : null}</Text>
            </Text>
            <Button type="submit" onClick={onback}>
                <ArrowLeftIcon />Back
            </Button>
            <Button type="submit" onClick={onNext} disabled={!tosAgree}>
                Finish<ArrowRightIcon />
            </Button>
        </div>
    );
};
// Step 5: Finalizing account.
// Run any final setup tasks and creates the account by sending the form data to the api/user/create endpoint.
const FinalizeAccount = ({onNext, username, gender, creator, commissionPreferences, tosAgree, formikValues}) => {

    const { session, userId } = useContext(UserDataContext);


    // Convert to formData and send to the server
    const finalizeAccount = async () => {
        // Gather the state variables into a formData object
        const formData = {
            ...formikValues,
            userId,
        };
        // Send the formData object to the server
        try {
            // Pass the formData object to the CreateNewAccount helper function
            console.log(formData)
            await CreateNewAccount(formData);
            onNext();
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    };
    // Todo: Add provider name to the message.
    let provider = session.provider;
    return (
        <div>
            <Heading>Finalize account setup</Heading>
            <Text>You are almost done setting up your account. You are using InkTail with your {provider} account.</Text>
            <Text>Here is a breakdown of what you entered in for your profile details and settings.</Text>
            <Text>Username: {username}</Text>
            <Text>Content you create: {commissionPreferences}</Text>
            <Text>Gender: {gender}</Text>
            <Text>Creator mode: {creator}</Text>

            <Button type="submit" onClick={finalizeAccount}>
                Finish<ArrowRightIcon />
            </Button>
        </div>
    );
};

export default OnboardingPage;
