import React from 'react';
import { Box, Card, Heading, Text, Badge, Button } from '@radix-ui/themes';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import {NewCharacterDialog} from "../Character/CreateCharacterDialog";

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
    return (
        <Box className="space-y-6 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card 1: Total Posts */}
                <Card className="bg-purple-900 p-4 shadow-md rounded-lg">
                    <Heading size="3" className="text-xl">Uploaded content</Heading>
                    <Text className="text-2xl">120</Text>
                </Card>

                {/* Card 2: Total Followers */}
                <Card className="bg-purple-900 p-4 shadow-md rounded-lg">
                    <Heading size="3" className="text-xl">Followers</Heading>
                    <Text className="text-2xl">1,250</Text>
                </Card>

                {/* Card 3: Earnings */}
                <Card className="bg-purple-900 p-4 shadow-md rounded-lg">
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
                    <Text>Create a new OC. This will add a new character you can customize and make uniquely your own</Text>
                    <Button className="mt-4 px-4 py-2 bg-white text-blue-500 rounded"><NewCharacterDialog></NewCharacterDialog></Button>
                </Card>
            </div>
        </Box>
    );
};

export default Dashboard;
