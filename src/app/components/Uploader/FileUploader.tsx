import React, { useEffect, useRef } from 'react';
import Uppy from '@uppy/core';
import Url from '@uppy/url';
import Dashboard from '@uppy/dashboard';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import GoldenRetriever from '@uppy/golden-retriever';
import Tus from '@uppy/tus';
import { createClient } from '../../utils/supabase/client';

const supabase = createClient();

interface FileUploaderProps {
    bucketName: string;
    fileSizeLimit?: number;
    storageURL?: string;
    allowedFileTypes?: string[];
    sizeLimit?: number;
    fileLimit?: number;
}

/**
 * FileUploader component. This component uses Uppy to upload files to Supabase Storage. Provide the bucket name and optional
 * storage URL to use this component.
 * @param bucketName The name of the bucket to upload files to
 * @param storageURL The URL of the Supabase Storage endpoint. Should not be changed unless you know what you're doing.
 * @param fileSizeLimit The maximum number of files that can be uploaded. Default is 1.
 * @param allowedFileTypes An array of allowed file types to upload
 * @param sizeLimit The maximum size of the file to upload. Default is 25MB. 1024 * 1024 * 25
 * @example <FileUploader bucketName="NameOfBucket" />
 */

const FileUploader: React.FC<FileUploaderProps> = (
    {
        bucketName,
        storageURL,
        fileSizeLimit = 1024 * 1024 * 25,
        fileLimit = 1,
        allowedFileTypes = ['image/*'],
}) => {
    const uppy = useRef<Uppy | null>(null);


    const bucket = bucketName;
    const supabaseStorageURL = 'https://echujftzgqswjjolmxez.supabase.co/storage/v1/upload/resumable';
    const sizeLimit = fileSizeLimit;


    useEffect(() => {
        const session = supabase.auth.getSession();
        supabase.auth.getSession().then(session => {
            console.log('Session:', session);
            const accessToken = session?.data?.session?.access_token;
            console.log('Access Token:', accessToken);


            uppy.current = new Uppy({
                meta: { bucket },
                restrictions:
                    {
                        maxNumberOfFiles: fileLimit,
                        maxFileSize: 1024 * 1024 * 25,
                        allowedFileTypes: allowedFileTypes,
                    },
                autoProceed: false,
            });

            uppy.current.use(Dashboard, {
                    inline: true,
                    target: '#dashboard',
                    showProgressDetails: true,
                    showRemoveButtonAfterComplete: true
            });
            // TODO: Fix companion URL set up.

            uppy.current.use(Url, {
                companionUrl: 'https://companion.uppy.io',
            });

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
                // Clean up Uppy
                uppy.current.destroy();

            }
        };

    }, [bucket,sizeLimit,allowedFileTypes,supabaseStorageURL]);


    return (
        <div>
            <div id="dashboard"></div>
        </div>
    );

};

export default FileUploader;