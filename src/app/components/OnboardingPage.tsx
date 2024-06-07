"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
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
import { useFormik } from "formik";
import { CreateNewAccount } from "../../app/utils/Helpers/accountHelper";

// set validation schema
let validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must be less than 20 characters')
        .matches(/^[a-zA-Z0-9_]*$/, 'Username must contain only letters, numbers, and underscores'),

});

const OnboardingPage = () => {
    // Set state variables for the onboarding steps
    const [step, setStep] = useState(1);
    const [disableNext, setDisableNext] = useState(false);
    const [username, setUsername] = useState("");
    const [gender, setGender] = useState("");
    const [creator, setCreator] = useState("false");
    const [commissionPreferences, setCommissionPreferences] = useState([]);
    const [progress, setProgress] = useState(0);


    // Formik input validation initialization
    const formik = useFormik({
        initialValues: {
            username: '',
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

    // Log the state of the onboarding steps
    useEffect(() => {
        console.log('username:', username);
        console.log('gender:', gender);
        console.log('creator:', creator);
        console.log('commissionPreferences:', commissionPreferences);
        console.log('step:', step);
        console.log('progress:', progress);
    }, [username, gender, creator, commissionPreferences, step, progress]);

    return (
        <div>
            <Box maxWidth="100%">
                <Progress value={progress} size={"3"}/>
            </Box>
            {step === 1 && <CreateUserName
                onNext={nextStep}
                username={username}
                setUsername={setUsername}
                gender={gender}
                setGender={setGender}
                formik={formik}
                setDisableNext={setDisableNext}
                disableNext={disableNext}
            />}

            {step === 2 && <IsCreator
                onNext={nextStep}
                onback={backStep}
                creator={creator}
                setCreator={setCreator}
            />}

            {step === 3 && <ChooseMediaTypes
                onNext={nextStep}
                onback={backStep}
            />}

            {step === 4 &&
                <TermsAndConditions
                onNext={nextStep}
                onback={backStep}
            />}
            {step === 5 &&
                <FinalizeAccount
                onNext={() => router.push('/')}
                username={username}
                gender={gender}
                creator={creator}
                commissionPreferences={commissionPreferences}
                    //TODO: Find out how to pass this variable thats not in the Parent state
                tosAgree={tosAgree}

            />}
        </div>
    );
};

// Onboarding steps

// Step 1: Set a username and profile information
const CreateUserName = ({ onNext, setUsername, username, gender, setGender, formik, setDisableNext, disableNext }) => {

    // Check for errors in formik and disable the next button if there are errors
    if (formik.errors.username) {
        setDisableNext(true)
    } else {
        setDisableNext(false)
    }

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
          id="username" name={username}
          placeholder={"Enter a username"}
          value={formik.values.username}
          onChange={formik.handleChange}
      />

        {formik.errors.username? <Text color={"red"} size={"5"}> 😔 {formik.errors.username}</Text> : null}

        <p>Gender</p>
        <Select.Root onValueChange={setGender} value={gender}>
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
        <Flex direction="column" gap="3">
            <Separator color="indigo" size="4" />
        </Flex>
      <Button type="submit" onClick={onNext} disabled={disableNext}>
        Next <ArrowRightIcon />
      </Button>
    </form>
  </div>
)};

// Step 2: Are you a creator?
const IsCreator = ({ onNext, onback: onBack, creator, setCreator }) => (
    <div>
        <Heading>Step 2: Would you like to accept commission requests on InkTail?</Heading>
        <p>You can always change this later.</p>

        <RadioGroup.Root name="creator" size={"3"} value={creator} onValueChange={setCreator}>
            <RadioGroup.Item value="true">Yes</RadioGroup.Item>
            <RadioGroup.Item value="false">No</RadioGroup.Item>
            {creator}
        </RadioGroup.Root>

        <Button type="submit" onClick={onBack}>
            <ArrowLeftIcon />Back
        </Button>
        <Button type="submit" onClick={onNext}>
            Next<ArrowRightIcon />
        </Button>
    </div>
);

// Step 3: Choose media types
const ChooseMediaTypes = ({onNext, onback}) => (
<div>
<Box width={"50%"}>
        <CheckboxCards.Root columns={{ initial: "1", sm: '2' }}>
            <CheckboxCards.Item value="digital" >
                <Flex direction="column" width="100%">
                    <Text weight="bold">Digital Art</Text>
                    <Text>Art created digitally using computer peripheral tools.</Text>
                </Flex>
            </CheckboxCards.Item>
            <CheckboxCards.Item value="traditional" id={"traditional"}>
                <Flex direction="column" width="100%">
                    <Text weight="bold">Classical Art</Text>
                    <Text>Art created with traditional paint, canvases, brushes, pencils.</Text>
                </Flex>
            </CheckboxCards.Item>
            <CheckboxCards.Item value="textile">
                <Flex direction="column" width="100%">
                    <Text weight="bold">Textile and Fashion</Text>
                    <Text>Fursuit, clothing or costumes</Text>
                </Flex>
            </CheckboxCards.Item>
            <CheckboxCards.Item value="model">
                <Flex direction="column" width="100%">
                    <Text weight="bold">Sculpture and 3D</Text>
                    <Text>Figuring, statues and other 3D creations.</Text>
                </Flex>
            </CheckboxCards.Item>

        </CheckboxCards.Root>

        <Button type="submit" onClick={onback}>
            <ArrowLeftIcon />Back
        </Button>
      <Button type="submit" onClick={onNext}>
          Next<ArrowRightIcon />
      </Button>
</Box>
  </div>
);

// Step 4: Agree to terms and conditions
// Get tos from the server.
const TermsAndConditions = ({onNext, onback, }) => {
    // Set state variables for the terms and conditions
    const [loading, setLoading] = useState(true);
    const [tos, setTos] = useState('');
    const [tosAgree, setTosAgree] = useState(false);
    //TODO: Disable next button if tosAgree is false


    useEffect(() => {
        console.log('tosAgree:', tosAgree);
        if (tosAgree === true) {
            console.log('tosAgree is true')
        } else {
            console.log('tosAgree is false')
        }
    }, [tosAgree]);


    // Fetch the terms and conditions from the server
    useEffect(() => {
        setLoading(true)

        fetch('api/tos/')
            .then(response => response.json())
            .then(data => setTos(data.fileContent));
        setLoading(false)
        // console.log(tos)
    }, []);

    return (
        <div>
            <h1>Step 4: Terms and Conditions</h1>
            <p>By clicking the button below, you agree to the InkTail terms and conditions</p>
            <br></br>
            <ScrollArea type="always" scrollbars="vertical" style={{ height: 500, width: 500}}>
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
                    <Checkbox size={"3"} onChange={(e) => setTosAgree((e.target as HTMLInputElement).checked)} />
                    I Agree to Terms and Conditions shown above
                </Flex>
            </Text>
            <Button type="submit" onClick={onback}>
                <ArrowLeftIcon />Back
            </Button>
            <Button type="submit" onClick={onNext} disabled={tosAgree}>
                Finish<ArrowRightIcon />
            </Button>
        </div>
    );
};
// Step 5: Finalize account
// Run any final setup tasks and create the account
const FinalizeAccount = ({onNext, username, gender, creator, commissionPreferences, tosAgree}) => {
    // Convert to formData and send to the server
    const finalizeAccount = async () => {
        // Gather the state variables into a formData object
        const formData = {
            username,
            gender,
            creator,
            commissionPreferences,
            tosAgree,
        };

        try {
            // Pass the formData object to the CreateNewAccount helper function
            await CreateNewAccount(formData);
            onNext();
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    };

    return (
        <div>
            <Heading>Creating your shiny new InkTail account ✨</Heading>
            <Text></Text>
            <Button loading type="submit" onClick={finalizeAccount}>
                Finish<ArrowRightIcon />
            </Button>
        </div>
    );
};

export default OnboardingPage;
