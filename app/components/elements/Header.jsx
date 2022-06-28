import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { NotificationImage } from '../../components'

export function Header({ className, title, page, ...props }) {


    return (
        <header className={`w-full shadow-custom-items p-4 flex justify-between items-center ${className}`} {...props}>
            <p className="text-3xl font-bold text-myblack">{title}</p>
            {title === 'Explore' && <NotificationImage className="w-8 h-8 flex justify-center items-center" />}
        </header>
    )
    // <header className="p-4 flex flex-col gap-4">

    //     {(page === 'artist' || page === 'song' || page === 'interpretation') &&
    //         <ChevronLeftImage className="w-8 h-8" />
    //     }

    //     <div className="flex flex-col justify-between gap-2">
    //         <div className="flex gap-2">

    //             {page === 'artist' && <>
    //                 <ArtistIconImage className="w-6 h-6" grey={true} />
    //                 <Title2>Artist</Title2>
    //             </>}

    //             {page === 'song' && <>
    //                 <SongIconImage className="w-6 h-6" grey={true} />
    //                 <Title2>Song</Title2>
    //             </>}

    //             {page === 'interpretation' && <>
    //                 <InterpretationIconImage className="w-6 h-6" grey={true} />
    //                 <Title2>Interpretation</Title2>
    //             </>}


    //         </div>
    //         <div className="flex justify-between">
    //             <Title>{artist ? artist : song ? song : interpretation}</Title>
    //             <FavoriteImage className="w-6 h-6" />
    //         </div>
    //         <div>
    //         </div>
    //     </div>
    // </header>

}



    // return <header className="w-full h-20 sticky top-0 z-50 bg-primary border-b-2 shadow-custom-header shadow-tertiary py-2 px-4" >
    //     <nav className="h-full flex justify-between items-center">

    //         {pageProps &&
    //             <p className="w-4/5 text-2xl text-tertiary font-medium">{pageProps}</p>}

    //         <div className="flex justify-around gap-2">
    //             <BellImage />
    //         </div>
    //     </nav>
    // </header>