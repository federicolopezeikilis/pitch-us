import Link from 'next/link'
import { UserSessionImage } from "../../components"

export const UserSessionLink = ({ className, children, userLoggedIn, pageOn, onClick, ...props }) => {
    return (
        <Link href={userLoggedIn ? '/profile/settings' : '/login'} className={`${className}`} {...props}>
            <a onClick={onClick}>
                <UserSessionImage pageOn={pageOn} />
            </a>
        </Link>
    )
}