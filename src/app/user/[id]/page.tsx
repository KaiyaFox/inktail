import LoginWithDiscordButton from '../../components/LoginWithDiscordButton'

import { redirect } from 'next/navigation'

import { createClient } from '../../utils/supabase/client'



export default async function UserPage() {
    const supabase = createClient()
    const session = supabase.auth.getSession()
    if (!session) {
        console.log('No active session')
        redirect('/login')
    }
    console.log('Active session:', session)
    const { data, error } = await supabase.auth.getUser()
    if (error) {
        console.error('Error getting user:', error.message)
        return
    }
    console.log('User:', data.user)
    return (
        <div>
            <h1>User Page</h1>
            <p>Welcome user with ID: {data.user.id}</p>
            <LoginWithDiscordButton />
            <p>Hello {data.user.email}</p>
        </div>

    )
}