import { SongItem } from "./SongItem"

export const SongsOfArtistList = ({ className, children, songs, ...props }) => {
    return (
        <ul className={`w-full bg-primary flex flex-col list-none shadow-custom-items ${className}`} {...props}>{children}
            {songs &&
                results.songs.map(song => <SongItem song={song} showArtist={true} />)
            }
        </ul>
    )
}
