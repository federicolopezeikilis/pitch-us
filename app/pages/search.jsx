import { retrieveArtistsAndSongs } from '../logic'
import { Header, Footer, SearchForm, FlexColSection } from '../components'
import { verifyTokenWithAPICall } from '../helpers'
import { useState } from 'react'
import { ArtistsAndSongsResultsList } from "../components"

export default function Search({ token }) {
    const [artistsAndSongs, setArtistsAndSongs] = useState(null)

    const waiting = 0

    const onChangeQueryTimeout = async (query, waitingPreviousValue) => {
        
        if (waitingPreviousValue === waiting) {
            try {

            
            const artistsAndSongsFounded = await retrieveArtistsAndSongs(query)

            setArtistsAndSongs(artistsAndSongsFounded)
            } catch(error) {
                
            }
        }
    }

    const onChangeQuery = async event => {
        const query = event.target.value

        if (query.length > 2) {
            const waitingActualValue = waiting + 1
            
            waiting++

            setTimeout(function () {
                onChangeQueryTimeout(query, waitingActualValue)
            }, 500)

        } else {
            waiting ++
            
            setArtistsAndSongs(null)
        }
    }

    const onCancelClick = async event => {
        setArtistsAndSongs(null)
    }

    return <div className="flex flex-col h-screen">
        <Header className="pb-2" title="Search" />
        <FlexColSection className="py-4 flex-1 overflow-y-auto items-center gap-4" >

            <SearchForm className="px-4"
                onChangeInput={onChangeQuery}
                onCancelClick={onCancelClick} />

            {artistsAndSongs &&
                <ArtistsAndSongsResultsList results={artistsAndSongs} />}

        </FlexColSection>
        <Footer userLoggedIn={!!token} page="search" ></Footer>
    </div>
}


export async function getServerSideProps({ req, res }) {
    const token = await verifyTokenWithAPICall(req, res)
    if (token) {
        return {
            props: { token }
        }
    } else {
        return {
            props: {}
        }
    }
}