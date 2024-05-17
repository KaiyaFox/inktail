// This is the TypeScript type definition for a Commission object. Use this interface to define the shape of a Commission object in InkTail.
export interface Commission {
    //id: string;
    title: string;
    description: string | null;
    creator_id: string | null;
    commissioner_id: string;
    price?: number | null;
    media_storage: string;
    created_at: Date;
    is_mature: boolean;
    status:
        | "Requested"
        | "In-Progress"
        | "Accepted"
        | "Rejected"
        | "Completed"
        | "Canceled"
        | "On-Hold"
        | null;
    media_type:
        | "digital_art"
        | "physical"
        | "animation"
        | "video"
        | "other"
        | null;
}

