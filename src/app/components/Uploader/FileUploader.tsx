import React, { use, useEffect, useRef } from 'react';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import GoldenRetriever from '@uppy/golden-retriever';
import Tus from '@uppy/tus';
import { createClient } from '../../utils/supabase/client';
import { headers } from 'next/headers';

const supabase = createClient();

interface FileUploaderProps {
    bucketName: string;
    storageURL?: string;
}

/**
 * FileUploader component. This component uses Uppy to upload files to Supabase Storage. Provide the bucket name and optional
 * storage URL to use this component.
 * @param bucketName
 * @param storageURL
 * @example <FileUploader bucketName="public" />
 */
const FileUploader: React.FC<FileUploaderProps> = ({ bucketName, storageURL }) => {
    const uppy = useRef<Uppy | null>(null);

    const bucket = bucketName;
    const supabaseStorageURL = 'https://echujftzgqswjjolmxez.supabase.co/storage/v1/upload/resumable';


    useEffect(() => {
        const session = supabase.auth.getSession();
        supabase.auth.getSession().then(session => {
            console.log('Session:', session);
            const accessToken = session?.data?.session?.access_token;


            uppy.current = new Uppy({
                meta: { bucket },
                restrictions: { maxNumberOfFiles: 3 },
                autoProceed: true,
            });

            uppy.current.use(Dashboard, { inline: true, target: '#dashboard' });
            uppy.current.use(GoldenRetriever);
            // Add the Tus plugin to enable resumable uploads
            uppy.current.use(Tus, {
                endpoint: supabaseStorageURL,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                uploadDataDuringCreation: true,
                chunkSize: 6 * 1024 * 1024,
                allowedMetaFields: [
                    "bucketName",
                    "objectName",
                    "contentType",
                    "cacheControl",
                ],
            });
            // Add metadata to each file
            uppy.current.on('file-added', (file) => {
                const supabaseMetadata = {
                    bucketName: bucket,
                    objectName: file.name,
                    contentType: file.type,
                }

                file.meta = {
                    ...file.meta,
                    ...supabaseMetadata,
                }
            });

        }).catch(error => {
            console.error('Error:', error);
        });
        console.log(bucket);


        return () => {
            if (uppy.current) {
                uppy.current.close();
            }
        };

    }, []);


    return (
        <div>
            <div id="dashboard"></div>
        </div>
    );

};

export default FileUploader;