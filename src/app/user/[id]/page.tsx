
// import React from 'react';
// import CreateNewCommission from '../../components/commission/CreateNew';

// interface UserPageProps {
//     id: string;
// }

// const UserPage: React.FC<UserPageProps> = ({ id }) => {
//     return (
//         <div>
//             <h1>User Page</h1>
//             <p>Welcome user with ID: {id}</p>
//             <CreateNewCommission />
//         </div>
//     );
// };

// export default UserPage;

import { redirect } from 'next/navigation'

import { createClient } from '@/app/utils/supabase/client'

export default async function PrivatePage() {
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    return <p>Hello {data.user.email}</p>
}