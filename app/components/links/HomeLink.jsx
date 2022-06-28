import Link from 'next/link'
import { HomeImage } from ".."

export const HomeLink = ({ className, children, pageOn, onClick, ...props }) => {
    return (
        <Link href="/" className={`${className}`} {...props}>
            <a onClick={onClick}>
                <HomeImage pageOn={pageOn} />
            </a>
        </Link>
    )
}

