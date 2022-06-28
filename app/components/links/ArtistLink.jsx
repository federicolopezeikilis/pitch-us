import Link from 'next/link'

export const ArtistLink = ({ className, children, artistName, ...props }) => {
    return (
        <Link
            href={`/artist/${artistName}`}
            className={`${className}`}
            {...props}>

            <a className="text-md text-quaternary font-semibold">{children}</a>

        </Link>
    )
}