import React from 'react';
import {Box, Card, Heading, Text, Badge, Button, Separator} from '@radix-ui/themes';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import {NewCharacterDialog} from "../Character/CreateCharacterDialog";
import { useRouter } from "next/navigation";
import {DividerHorizontalIcon} from "@radix-ui/react-icons";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'], // months for example
    datasets: [
        {
            label: 'Content Engagement',
            data: [12, 19, 3, 5, 2, 3], // example engagement data
            fill: false,
            borderColor: '#4caf50', // Green color
            tension: 0.1,
        },
    ],
};

const Dashboard: React.FC = () => {
    const router = useRouter();

    const handleCardClick = (path: string) => {
        router.push(path)
    };

    return (

        <Box className="space-y-6 p-6">
            <Heading size="5" className="text-2xl">Dashboard</Heading>
            <Text className="text-gray-500" size={'1'}>Welcome back, user</Text>
            <Separator size="4" orientation="horizontal"/>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1">
                {/* Card 1: Total Posts */}
                <Card className="bg-purple-900 p-4 shadow-md rounded-lg cursor-pointer">
                    <Heading size="3" className="text-xl">Uploaded content</Heading>
                    <Text className="text-2xl">120</Text>
                </Card>


                {/* Card 3: Earnings */}
                <Card className="bg-purple-900 p-4 shadow-md rounded-lg cursor-pointer"
                      onClick={() => handleCardClick('/my-characters')}>
                    <Heading size="3" className="text-xl">Original Characters</Heading>
                    <Text className="text-2xl">4</Text>
                </Card>


                {/* Card 2: Total Followers */}
                <Card className="bg-purple-900 p-4 shadow-md rounded-lg cursor-pointer">
                    <Heading size="3" className="text-xl">Followers</Heading>
                    <Text className="text-2xl">1,250</Text>
                </Card>

                {/* Card 3: Earnings */}
                <Card className="bg-purple-900 p-4 shadow-md rounded-lg cursor-pointer">
                    <Heading size="3" className="text-xl">Commission Payouts (Last 30 days)</Heading>
                    <Text className="text-2xl">$500</Text>
                </Card>
            </div>

            {/*/!* Line Chart for Content Engagement *!/*/}
            {/*<div className="bg-purple-900 p-6 shadow-md rounded-lg">*/}
            {/*    <Heading size="3" className="text-xl mb-4">Content Engagement Over Time</Heading>*/}
            {/*    <Line data={data} />*/}
            {/*</div>*/}

            {/* Action Buttons */}

            <Heading size="5" className="text-2xl">Content Manager</Heading>
            <Text className="text-gray-500" size={'1'}>Manage your own content and characters you share with the world</Text>
            <Separator size="4" orientation="horizontal"/>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <Card className="bg-blue-500 p-4 text-white rounded-lg">
                    <Heading size="3">Create New Content</Heading>
                    <Text>Create a new post or upload content to engage with your audience.</Text>
                    <Button className="mt-4 px-4 py-2 bg-white text-blue-500 rounded">Create</Button>
                </Card>

                <Card className="bg-green-500 p-4 text-white rounded-lg">
                    <Heading size="3">View Analytics</Heading>
                    <Text>View detailed insights about your content performance.</Text>
                    <Button className="mt-4 px-4 py-2 bg-white text-green-500 rounded">View</Button>
                </Card>

                <Card className={"bg-blue-500 p-4 text-white rounded-lg"}>
                    <Heading size={"3"}>Create a new Character</Heading>
                    <Text>Create a new OC. This will add a new character you can customize and make uniquely your
                        own</Text>
                    <NewCharacterDialog/>
                </Card>
            </div>

            <Heading size="5" className="text-2xl">Commission Manager</Heading>
            <Text className="text-gray-500" size={'1'}>Manage your commissions and creations you are working on for other users</Text>
            <Separator size="4" orientation="horizontal"/>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <Card className="bg-blue-500 p-4 text-white rounded-lg">
                    <Heading size="3">Create New Content</Heading>
                    <Text>Create a new post or upload content to engage with your audience.</Text>
                    <Button className="mt-4 px-4 py-2 bg-white text-blue-500 rounded">Create</Button>
                </Card>

                <Card className="bg-green-500 p-4 text-white rounded-lg">
                    <Heading size="3">View Analytics</Heading>
                    <Text>View detailed insights about your content performance.</Text>
                    <Button className="mt-4 px-4 py-2 bg-white text-green-500 rounded">View</Button>
                </Card>

                <Card className={"bg-blue-500 p-4 text-white rounded-lg"}>
                    <Heading size={"3"}>Create a new Character</Heading>
                    <Text>Create a new OC. This will add a new character you can customize and make uniquely your
                        own</Text>
                    <NewCharacterDialog/>
                </Card>
            </div>
        </Box>

    );
};

export default Dashboard;
