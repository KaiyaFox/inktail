import React, { use, useEffect, useRef } from 'react';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import GoldenRetriever from '@uppy/golden-retriever';
import Tus from '@uppy/tus';
import { createClient } from '../../utils/supabase/client';
import { headers } from 'next/headers';

const SUPABASE_PROJECT_ID = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID;
const supabase = createClient();

const FileUploader: React.FC = () => {
    const uppy = useRef(null);

    const bucket = 'commission_refs';
    const supabaseStorageURL = 'https://evhegzzxnckoxwwtkjhz.supabase.co/storage/v1/upload/resumable';


    useEffect(() => {
        const session = supabase.auth.getSession();
        supabase.auth.getSession().then(session => {
            console.log('Session:', session);
            const accessToken = session.data.session.access_token;
            // rest of your code that depends on `session`



            uppy.current = new Uppy({
                meta: { bucket },
                restrictions: { maxNumberOfFiles: 3 },
                autoProceed: true,
            });

            uppy.current.use(Dashboard, { inline: true, target: '#dashboard' });
            uppy.current.use(GoldenRetriever);

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

                onError: (error) => {
                    console.error('Error:', error);
                }




            });
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
        console.log(bucket)



        return () => {
            if (uppy.current) {
                uppy.current.close();
            }
        };

    }, []);


    return (
        <div>
            {/* Your component JSX goes here */}
            <div id="dashboard"></div>
        </div>
    );
};

export default FileUploader;