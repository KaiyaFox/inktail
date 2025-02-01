interface User {
    id: string;
    name: string;
    gender?: string;
    pronouns?: string;
    sex?: string;
    profilePicture?: string;
    bannerPicture?: string;
    handle?: string;
    characters?: Character[]; // A User can have multiple characters
    fursuits?: Fursuit[]; // A user can have multiple fursuits
    artworks?: Artwork[]; // A user can have multiple artworks
}

interface Character {
    id: string;
    name: string;
    species: string[];
    description: string;
    colorSwatches?: Record<string, string>; // Example: { "tailColor": "#FF5733", "pawColor": "#FFD700" }
    owner: User; // Reference to the User who owns the character
    gender: string;
    sex?: string;
    tags: string[];

    // Art-related properties
    referenceSheets?: string[]; // URLs to reference sheets for the character
    commissioners?: User[]; // Users who created art for this character
}

interface Commission {
    id: string; // Unique commission ID
    created_at: string; // Timestamp of commission creation
    creator: User; // The artist creating the commission
    commissioner: User; // The user requesting the commission
    characters: Character[]; // The characters involved in the commission
    description: string; // Description of the commission request
    price?: number; // Price agreed upon for the commission
    status: 'open' | 'in_progress' | 'completed'; // Commission status
    deadline?: string; // Optional deadline for the commission (could be a date string)
    artFiles: string[]; // URLs to the uploaded art files or hosted images
    paymentStatus: 'pending' | 'paid' | 'refunded'; // Track the payment status
    comments: Comment[]; // Comments or updates on the commission
}

interface Fursuit {
    id: string; // Unique fursuit ID
    character: Character; // Reference to the parent Character
    material: string[]; // Materials used
    creator: User[]; // Users who made the fursuit
}

interface Artwork {
    id: string; // Unique artwork ID
    name: string; // Name or title of the artwork
    description?: string; // Optional description of the artwork
    created_at: string; // Timestamp of when the artwork was uploaded
    creator: User; // User who created/uploaded the artwork
    artFiles: string[]; // URLs to the uploaded art files or hosted images
    tags: string[]; // Tags associated with the artwork (e.g., "digital", "traditional", "sketch")
    linkedCharacters?: Character[]; // Optional link to a character if the artwork is related to one
}
