import Link from 'next/link'
import { retrieveUser } from '../../../logic'
import { verifyTokenWithAPICall } from '../../../helpers'
import { useRouter } from 'next/router'
import { AvatarDemo64Image, ChevronRightImage, FlexColSection, Footer, Header } from '../../../components'

export default function Settings({ token, user }) {
    const router = useRouter()

    const onLogOutClick = () => {
        router.push('/logout')
    }

    return (
        <div className="flex flex-col h-screen">
            <Header title="Profile" />

            <FlexColSection className="flex-1 overflow-y-auto">

                <div className="w-full px-4 pt-2 flex gap-4 items-center border-b border-b-inputBg">
                    <AvatarDemo64Image />
                    <p className="text-myblack font-bold">{user.username}</p>
                </div>

                <div className="px-4 py-2 flex items-center border-b border-b-inputBg">
                    <p className="py-2 text-myblack font-medium">Account Settings</p>
                </div>
                <Link href='/profile/settings/edit'>
                    <a className="w-full pl-10 pr-2 py-2 flex justify-between items-center border-b border-b-inputBg">
                        <p className="py-2 text-mygrey font-medium text-sm">Personal Information</p>
                        <div><ChevronRightImage className="w-6 h-6" />
                        </div>
                    </a>
                </Link>

                <Link href="/profile/settings/change-password">
                    <a className="w-full pl-10 pr-2 py-2 flex justify-between items-center border-b border-b-inputBg">
                        <p className="py-2 text-mygrey font-medium text-sm">Change Password</p>
                        <div><ChevronRightImage className="w-6 h-6" />
                        </div>
                    </a>
                </Link>
                <Link href="/profile/settings/delete-account">
                    <a className="w-full pl-10 pr-2 py-2 flex justify-between items-center border-b border-b-inputBg">
                        <p className="py-2 text-mygrey font-medium text-sm">Delete Account</p>
                        <div><ChevronRightImage className="w-6 h-6" />
                        </div>
                    </a>
                </Link>

                <button
                    className="mt-14 text-myblue font-medium"
                    onClick={onLogOutClick}
                >Log Out</button>

            </FlexColSection>
            
            <Footer userLoggedIn={!!token} page="user-session" />
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