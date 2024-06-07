// Helper functions that assist in user account data manipulation

// TODO: Create api endpoint to handle account creation

export const CreateNewAccount = async (formData: any) => {
    try {
        console.log('Creating account...');
        const response = await fetch('/api/account/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            console.log('Account created successfully!', formData);
            return true;
        } else {
            console.error('Failed to create account');
            return false;
        }
    } catch (error) {
        console.error('Error creating account:', error);
        return false;
    }
}