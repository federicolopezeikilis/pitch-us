import Link from 'next/link'

export const SongLink = ({ className, children, artistName, pageOn, ...props }) => {
    return (
        <Link
            href={`/artist/${artistName}`}
            className={`${className}`}
            {...props}>

            <a className="text-lg text-quaternary font-semibold">{children}</a>

        </Link>
    )
}