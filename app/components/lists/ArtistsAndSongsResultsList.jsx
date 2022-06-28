import { ArtistItem, SongItem } from '../../components'

export const ArtistsAndSongsResultsList = ({ className, children, results, songs, ...props }) => {
    return (
        <ul className={`w-full bg-primary flex flex-col list-none shadow-custom-items ${className}`} {...props}>{children}

            {results && results.artists &&
                    results.artists.map(artist => <ArtistItem artist={artist} />)
            }

            {results && results.songs &&
                results.songs.map(song => <SongItem song={song} showArtist={true} />)
            }
            
            {songs &&
                songs.map(song => <SongItem song={song} />)
            }
        </ul>
    )
}
