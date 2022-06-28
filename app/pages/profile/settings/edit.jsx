import Link from 'next/link'
import { useContext } from 'react'
import { retrieveUser, updateUser } from '../../../logic'
import { verifyTokenWithAPICall } from '../../../helpers'
import { useRouter } from 'next/router'
import { ChevronLeftImage, EditProfileForm, FlexColSection, Footer, Context } from '../../../components'

export default function editProfile({ token, user }) {
    const { handleFeedback } = useContext(Context)
    const router = useRouter()

    const handleFormSubmit = event => {
        event.preventDefault()

        const firstName = event.target.firstName.value
        const lastName = event.target.lastName.value
        const dateOfBirth = new Date(event.target.dateOfBirth.value)

        try {
            updateUser(token, { firstName, lastName, dateOfBirth })

            handleFeedback('success', 'Update Personal Information', 'Redirecting to settings page')
            
            router.push('/profile/settings')
        } catch (error) {
            handleFeedback('error', 'Error', error.message)
        }
    }

    return (
    <div className="flex flex-col h-screen">
        <header className="shadow-custom-items pt-7 px-4 pb-4">
            <Link href='/profile/settings'>
                <ChevronLeftImage className="w-8 h-8 float-left" />
            </Link>
            <h1 className="text-xl text-mygrey font-bold">Personal Information</h1>
        </header>
        <FlexColSection className="px-4 flex-1 overflow-y-auto bg-primary gap-5 justify-center items-center">
            <EditProfileForm
                onSubmit={handleFormSubmit} user={user} />

        </FlexColSection>
        <Footer page="user-session" userLoggedIn={!!token} />
    </div>
    )
}

export async function getServerSideProps({ req, res }) {
    const { token } = await verifyTokenWithAPICall(req, res)

    const user = await retrieveUser(token)

    return {
        props: { user, token }
    }
}