import React from "react";
import FileUploader from "../../Uploader/FileUploader";

interface ReferenceSheetProps {
    userid: string;
}

const ReferenceSheet: React.FC = () => {
    return (
        <div>
            <h1>Reference Sheet</h1>
            <p>Reference Sheet</p>
            <FileUploader bucketName="characters" fileLimit={3} />

        </div>
    );
}

export default ReferenceSheet;