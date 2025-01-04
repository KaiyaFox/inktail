import React, {useState} from "react";
import FileUploader from "../../Uploader/FileUploader";
import Uppy from "@uppy/core";

interface ReferenceSheetProps {
    userid: string;
}

// get the userid from context


const ReferenceSheet: React.FC<ReferenceSheetProps> = ({ userid }) => {
    const [uppyInstance] = useState(() => new Uppy());
    return (
        <div>
            <h1>Reference Sheet</h1>
            <p>Reference Sheet</p>
            <FileUploader bucketName={userid} fileLimit={3} uppyInstance={uppyInstance} />

        </div>
    );
}


export default ReferenceSheet;