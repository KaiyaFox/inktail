import React from "react";
import { Field } from "formik";
import {TextField, Callout, Box} from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";

interface PhysicalAppearanceProps {
    data: {
        height: string;
        weight: string;
        hairColor: string;
        hairStyle: string;
        hairLength: string;
        hairTexture: string;
        ears: string;
        innerEar: string;
        eyeType: string;
        eyeColor: string;
        skinColor: string;
        facialHair: string;
        bodyMarkings: string;


    };
    onchange: (field: string, value: any) => void;
}

const PhysicalAppearance: React.FC<PhysicalAppearanceProps> = ({ data, onchange }) => {
    return (
        <div>
            <h1>Physical Appearance</h1>

            <Callout.Root>
                <Callout.Icon>
                    <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                    You can be as descriptive as you need to be within the fields below. Keep in mind that if this
                    character is used for commission work; all the fields below will be visible to the commissioner.
                </Callout.Text>
            </Callout.Root>

            <Box
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "16px",
                    marginTop: "24px"
                }}
            >
                {[
                    { label: "Height", name: "height", placeholder: "Tall, Short, Average etc. OR exact height" },
                    { label: "Weight", name: "weight", placeholder: "Thin, Muscular, Heavy etc. OR exact weight" },
                    { label: "Hair Color", name: "hairColor", placeholder: "Hair color" },
                    { label: "Hair Style", name: "hairStyle", placeholder: "Hair style" },
                    { label: "Hair Length", name: "hairLength", placeholder: "Hair length" },
                    { label: "Hair Texture", name: "hairTexture", placeholder: "Hair texture" },
                    { label: "Ears", name: "ears", placeholder: "Ears" },
                    { label: "Inner Ear", name: "innerEar", placeholder: "Inner Ear" },
                    { label: "Eye Type", name: "eyeType", placeholder: "Eye Type" },
                    { label: "Eye Color", name: "eyeColor", placeholder: "Eye color" },
                    { label: "Skin Color", name: "skinColor", placeholder: "Skin color" },
                    { label: "Facial Hair", name: "facialHair", placeholder: "Facial hair" },
                    { label: "Body Markings", name: "bodyMarkings", placeholder: "Body markings" },

                ].map((field) => (
                    <div key={field.name}>
                        <label style={{ display: "block", marginBottom: "8px" }}>{field.label}</label>
                        <Field
                            as={TextField.Root}
                            name={field.name}
                            color="purple"
                            variant="solid"
                            radius="full"
                            placeholder={field.placeholder}
                        />
                    </div>
                ))}
            </Box>
        </div>
    );
};

export default PhysicalAppearance;
