import Link from 'next/link'
import { useRouter } from 'next/router'
import { ArtistIconImage, ArtistsAndSongsResultsList, ChevronLeftImage, FavoriteImage, FlexColSection, Footer, Title2, Title, ButtonBlue } from '../../../components'
import { retrieveSongsOfArtist } from '../../../logic'
import { useState } from 'react'
import { verifyTokenWithAPICall } from '../../../helpers'

export default function Artist({ token, songs }) {
    const router = useRouter()

    const [likedArtist, setLikedArtist] = useState(false)

    const artist = songs[0].artist.name

    const onBackClick = () => {
        router.back()
    }

    const onFavoriteClick = () => likedArtist === false ? setLikedArtist(true) : setLikedArtist(false)

    return <div className="flex flex-col h-screen">
        <header className="w-full bg-white p-4 gap-4 shadow-custom-items">
            <div className="flex flex-col">
                <ChevronLeftImage className="w-8 h-8" onClick={onBackClick} />
                <div className="flex flex-col justify-between gap-2">
                    <div className="flex gap-2">
                        <ArtistIconImage className="w-6 h-6" color="grey" />
                        <Title2>Artist</Title2>
                    </div>
                    <div className="flex justify-between items-center">
                        <Title>{artist}</Title>
                        <FavoriteImage full={likedArtist} onClick={onFavoriteClick} className="w-6 h-6 -mb-1" />
                    </div>
                </div>
            </div>
        </header>

        <FlexColSection className="items-center">
            <div className="w-full h-14 px-4 bg-primary flex items-center justify-between">
                <h3 className="text-xl text-myblack font-bold">Songs</h3>
                <Link href='/create-interpretation'>
                    <ButtonBlue>Add New Song</ButtonBlue>
                </Link>
            </div>
            <ArtistsAndSongsResultsList songs={songs} />
        </FlexColSection>
        <Footer userLoggedIn={!!token} />
    </div>
}

export async function getServerSideProps({ params, req, res }) {
    const { token } = await verifyTokenWithAPICall(req, res)

    const songs = await retrieveSongsOfArtist(params.artistName)

    return {
        props: {
            token, songs
        }
    }
}