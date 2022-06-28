import Link from 'next/link'
import { SongIconImage } from '../../components'

export const SongItem = ({ className, children, song, onClick, ...props }) => {
    return (
        <li
        className={`w-full h-14 bg-primary shadow-custom-items ${className}`}
        key={song.id}
        onClick={onClick}
        {...props}>
            
            {!onClick ?
             <Link href={`/artist/${song.artist.name.split(' ').join('-').toLowerCase()}/song/${song.name.split(' ').join('-').toLowerCase()}`}>
                <div className="w-full h-full px-4 flex gap-4 items-center">
                    <SongIconImage className="w-6 h-6" />
                    <div className="h-full w-full flex flex-col justify-center">
                        <div className="flex items-end gap-1">
                            <p className="leading-4 font-medium text-myblack" >{song.name}</p>
                            <p className="leading-4">·</p>
                            <p className="leading-4 text-myblack" >{song.artist.name}</p>
                        </div>
                        <p className="w-full leading-4 text-sm font-medium text-placeholder" >Song</p>
                    </div>
                </div>
            </Link>
            :
            <div className="w-full h-full px-4 flex gap-4 items-center">
                    <SongIconImage className="w-6 h-6" />
                    <div className="h-full w-full flex flex-col justify-center">
                        <div className="flex items-end gap-1">
                            <p className="leading-4 font-medium text-myblack" >{song.name}</p>
                            <p className="leading-4">·</p>
                            <p className="leading-4 text-myblack" >{song.artist.name}</p>
                        </div>
                        <p className="w-full leading-4 text-sm font-medium text-placeholder" >Song</p>
                    </div>
                </div>
            }

        </li>

        // <li className={`w-full h-14 bg-secondary shadow-sm shadow-tertiary rounded-md ${className}`} {...props} key={song.id}>
        //     <Link href={`/artist/${song.artist.name.split(' ').join('-').toLowerCase()}/song/${song.name.split(' ').join('-').toLowerCase()}`}>
        //         <button className="w-full h-full flex flex-col justify-center">

        //             {showArtist && <>
        //                 <p className="px-2">{song.name}</p>
        //                 <p className="px-2 text-sm">Artist: {song.artist.name}</p>
        //             </>}

        //             {!showArtist &&
        //                 <p className="px-2">{song.name}</p>
        //             }

        //         </button>
        //     </Link>
        // </li>
    )
}