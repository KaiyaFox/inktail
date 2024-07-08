// Form for creating a new commission
'use client'
import React, { useState } from 'react';
import {Flex, Text, Button, TextArea, Checkbox, TextField} from '@radix-ui/themes';
import { createClient } from '../../utils/supabase/client';
import FileUploader from '../Uploader/FileUploader';

const client = createClient();

const session = client.auth.getSession();

console.log('Session:', session);

const CreateNewCommission = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isMature, setIsMature] = useState(false);
    const [media_type, setMediaType] = useState('digital_art');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleMediaTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMediaType(e.target.value);
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Create an object to hold the form data
        const formData = {
            title: title,
            description: description,
            isMature: isMature,
            media_type: media_type,
        };

        console.log('Form Data:', formData);

        try {
            console.log('Creating commission...');
            setIsLoading(true);
            const response = await fetch('/api/commissions/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Commission created successfully!', formData);
                setTitle('');
                setDescription('');
                setIsMature(false);
            } else {
                console.error('Failed to create commission');
            }
        } catch (error) {
            console.error('Error creating commission:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title:</label>
                <TextField.Root placeholder="Name your comission piece..." type="text" id="title" value={title} onChange={handleTitleChange} />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <TextArea placeholder="Describe high level details about your comission piece that you want the artist to know about..." id="description" value={description} onChange={handleDescriptionChange} />
            </div>
            <div>
                <label htmlFor="reference_media">Ref Sheet:</label>
                <input type="file" id="reference_media" />
                <FileUploader />


            </div>
            <div>
                <label htmlFor="isMature">Mature (NSFW):</label>
                <input type="checkbox" id="isMature" checked={isMature} onChange={() => setIsMature(!isMature)} />
            </div>
            <div>
                <label htmlFor='media_type'>Media Type:</label>
                <select id='media_type' value={media_type} onChange={handleMediaTypeChange}>
                    <option value='digital_art'>Digital Art</option>
                    <option value='video'>Video</option>
                    <option value='physical'>Fursuit</option>
                    <option value='animation'>Animation</option>
                    <option value='audio'>Audio</option>
                    <option value='text'>Story/Script</option>
                </select>
            </div>
            <Button type="submit">Submit</Button>
            {isLoading && <p>Loading...</p>}
        </form>
    );
};

export default CreateNewCommission;
