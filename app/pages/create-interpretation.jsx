import { Header, Footer, FlexColSection, ChevronRightImage, AuxiliarDiv, AuxiliarDivSearch, ArtistItem, SongItem, Context } from '../components'
import { verifyTokenWithAPICall } from '../helpers'
import { retrieveArtists, retrieveSongsOfArtist, addInterpretationToSong, createSong, createArtist } from '../logic'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'

export default function CreateInterpretation({ token }) {
    const [artistState, setArtistState] = useState('active')
    const [queryArtist, setQueryArtist] = useState(null)
    const [artistsDisplayed, setArtistsDisplayed] = useState(null)
    const [artist, setArtist] = useState(null)

    const [songState, setSongState] = useState('inactive')
    const [querySong, setQuerySong] = useState(null)
    const [songsOfArtist, setSongsOfArtist] = useState(null)
    const [songsDisplayed, setSongsDisplayed] = useState(null)
    const [song, setSong] = useState(null)

    const router = useRouter()

    const { handleFeedback } = useContext(Context)

    const onChangeQueryArtist = async event => {
        const query = event.target.value

        if (query) {
            setQueryArtist(query)

            try {
                const artists = await retrieveArtists(query)

                if (artists.length === 0)
                    setArtistState('create')
                else if (artistState === 'create')
                    setArtistState('active')

                setArtistsDisplayed(artists)
            } catch (error) {
                handleFeedback('error', 'Error', error.message)
            }

        } else {
            setQueryArtist(false)
            setArtistsDisplayed(null)
        }
    }

    const onClickCreateArtist = event => {
        debugger
        event.preventDefault()

        const artistName = event.target.input.value

        setArtist({ name: artistName })
        setArtistsDisplayed(null)
        setArtistState('intermediate')
        setSongState('create')
    }

    const onClickArtist = async artistChosen => {
        setArtist(artistChosen)
        setArtistsDisplayed(null)
        setArtistState('intermediate')
        setSongState('active')

        try {
            const songs = await retrieveSongsOfArtist(artistChosen.name)

            if (songs.length > 0) {
                setSongsOfArtist(songs)
                setSongsDisplayed(songs)
            }
        } catch (error) {
            handleFeedback('error', 'Error', error.message)
        }
    }

    const onClickChangeArtist = () => {
        setArtist(null)
        setSongsOfArtist(null)
        setSongsDisplayed(null)
        setArtistState('active')
        setSongState('inactive')

        if (song) setSong(null)
    }

    const onClickCreateSong = event => {
        event.preventDefault()

        setSong({ name: event.target.input.value })
        setSongsDisplayed(null)
        setSongState('intermediate')
    }

    const onChangeQuerySong = async event => {
        const query = event.target.value

        if (query) {
            if (songsOfArtist != null) {
                const songsFounded = songsOfArtist.filter(songOfArtist => songOfArtist.name.toLowerCase().includes(query.toLowerCase()))

                if (songsFounded.length === 0) {
                    setSongsDisplayed(null)
                    setSongState('create')
                } else {

                    setSongsDisplayed(songsFounded)

                    if (songState === 'create')
                        setSongState('active')
                }
            } else
                setSongsDisplayed(songsOfArtist)
        }
    }

    const onClickSong = async songChosen => {
        setSong(songChosen)
        setSongsDisplayed(null)
        setSongState('intermediate')
    }

    const onClickChangeSong = () => {
        setSong(null)
        setSongsDisplayed(songsOfArtist)
        setSongState('active')
    }

    const onSubmitInterpretation = async event => {
        event.preventDefault()
        debugger
        const content = event.target.textarea.value

        try {
            if (!artist.id) {
                debugger
                artist.id = await createArtist(token, artist.name)
            }

            if (!song.id) {
                song.id = await createSong(token, { artist: artist.id, name: song.name })
            }

            const interpretationId = await addInterpretationToSong(token, song.id, content)

            handleFeedback('success', 'Interpretation created!', 'Redirecting to your new interpretation')

            router.push(`/artist/${artist.name}/song/${song.name}/interpretation/${interpretationId}`)
        } catch (error) {
            handleFeedback('error', 'Error', error.message)
        }
    }

    return (
        <div className="flex flex-col h-screen">
            <Header title="Add New" />
            <FlexColSection className="bg-primary flex-1 overflow-y-auto">

                <div className="w-full p-4 flex gap-2">
                    {
                        !artist ?
                            <>
                                <AuxiliarDiv color="blue" type="artist" />
                                <AuxiliarDiv color="light-blue" type="song" />
                                <AuxiliarDiv color="light-blue" type="interpretation" />
                            </>
                            :
                            !song ?
                                <>
                                    <AuxiliarDiv color="white" type="artist" />
                                    <AuxiliarDiv color="blue" type="song" />
                                    <AuxiliarDiv color="light-blue" type="interpretation" />
                                </>
                                :
                                <>
                                    <AuxiliarDiv color="white" type="artist" />
                                    <AuxiliarDiv color="white" type="song" />
                                    <AuxiliarDiv color="blue" type="interpretation" />
                                </>
                    }
                </div>

                {
                    <AuxiliarDivSearch
                        state={artistState}
                        type="artist"
                        content={artist}
                        onChange={onChangeQueryArtist}
                        onEditClick={onClickChangeArtist}
                        onCreate={onClickCreateArtist}
                        query={queryArtist}
                    />
                }


                {artistsDisplayed && <ul>{
                    artistsDisplayed.map(artist => {
                        return <ArtistItem
                            className="px-2"
                            artist={artist}
                            key={artist.id}
                            onClick={function () {
                                onClickArtist(artist)
                            }} />
                    })}
                </ul>
                }


                {
                    <AuxiliarDivSearch
                        state={songState}
                        type="song"
                        content={song}
                        onChange={onChangeQuerySong}
                        onEditClick={onClickChangeSong}
                        onCreate={onClickCreateSong}
                        query={querySong}
                    />

                }


                {songsDisplayed && <ul>{
                    songsDisplayed.map(song => {
                        return <SongItem
                            className="px-2"
                            song={song}
                            key={song.id}
                            onClick={function () {
                                onClickSong(song)
                            }}
                        />
                    })}
                </ul>
                }


                {!song ?
                    <div className="mt-6 w-full px-4 gap-1">
                        <h3 className="font-medium text-placeholder">Interpretation</h3>
                        <div className="w-full h-80 border border-inputBg rounded bg-white">

                        </div>
                    </div>
                    :
                    <form
                        className="w-full px-4 gap-1"
                        onSubmit={onSubmitInterpretation}>

                        <h3 className="font-medium text-myblack">Write (or paste) here your interpretation</h3>
                        <textarea className="w-full h-80 border border-inputBg rounded p-2 bg-white focus:outline-none text-sm text-myblack" name="textarea" />

                        <div className="mt-3 flex items-center justify-center">
                            <button className="w-44 rounded-full bg-mygreen py-4 flex justify-center items-center gap-4">
                                <p className="font-medium text-white">Publish</p>
                                <ChevronRightImage className="mt-0.5 w-6 h-6" color="white" />
                            </button>
                        </div>
                    </form>
                }

            </FlexColSection>

            <Footer page="create-interpretation" userLoggedIn={!!token}/>
        </div>
    )
    {
            /* 
            BOTONES PREVIOUS Y NEXT LISTOS
            <div className="p-4 flex justify-center items-center gap-4">

                <button className="w-full rounded-full bg-white py-4 flex justify-center items-center gap-4">
                    <ChevronLeftImage className="w-6 h-6" color="green" />
                    <p className="font-medium text-myblue">Previous</p>
                </button>

                <button onClicklassName="w-full rounded-full bg-mygreen py-4 flex justify-center items-center gap-4">
                    <p className="font-medium text-white">Next</p>
                    <ChevronRightImage className="mt-0.5 w-6 h-6" color="white" />
                </button>

            </div> */}
}

export async function getServerSideProps({ req, res }) {
    const { token } = await verifyTokenWithAPICall(req, res)

    return {
        props: { token }
    }
}


// return <>
//     <Header />
//     <FlexColSection>
//         {!artist &&
//             <form className="w-2/3 h-11/12"
//                 onSubmit={onClickCreateArtist}
//             >
//                 <input className="w-full text-2xl bg-gray-200" type="search" name="artist" id="artist" placeholder="Artist"
//                     onChange={onChangeQueryArtist}
//                 ></input>
//                 {queryArtist && artistsDisplayed && artistsDisplayed.length === 0 &&
//                     <>
//                         <p>We don't have interpretations for this artist. Want to create?</p>
//                         <button type="submit">Accept</button>
//                     </>
//                 }
//             </form>}

//     </FlexColSection>
//     <Footer />
// </>



{/* 
        
        LISTO BORRAR
        <div className="flex flex-col gap-1">
                    <p className="font-medium text-myblack">Pick an artist</p>
                    <div className="w-full px-4 py-3 bg-white border border-inputBg rounded flex gap-2">
                    <SearchImage className="w-5 h-5" />
                    <input className="w-full bg-white focus:outline-none text-sm text-mygrey" type="search" />
                    </div>
                </div> */}

{/* <main>


                TODAVÍA FALTA!!
                {!artist &&
                    <form className="w-2/3 h-11/12"
                        onSubmit={onClickCreateArtist}
                    >
                        <input className="w-full text-2xl bg-gray-200" type="search" name="artist" id="artist" placeholder="Artist"
                            onChange={onChangeQueryArtist}
                        ></input>
                        {queryArtist && artistsDisplayed && artistsDisplayed.length === 0 &&
                            <>
                                <p>We don't have interpretations for this artist. Want to create?</p>
                                <button type="submit">Accept</button>
                            </>
                        }
                    </form>}

                        LISTO PARA BORRAR!!
                {artistsDisplayed &&
                    artistsDisplayed.map(artist => {
                        return <li className="w-11/12 h-14 bg-gray-200" key={artist.id}>
                            <button className="px-2 w-full h-full flex items-center justify-start"
                                onClick={
                                    event => {
                                        event.preventDefault()

                                        onClickArtist(artist)
                                    }}
                            >{artist.name}
                            </button>
                        </li>
                    })
                }

                LISTO PARA BORRAR!!
                {artist &&
                    <div>
                        <p className="inline">Artist: {artist.name}</p>
                        <button className="mx-1 bg-gray-200"
                            onClick={onClickChangeArtist}
                        >Change</button>
                    </div>
                }

                {artist && !song &&
                    <form className="w-2/3 h-11/12"
                        onSubmit={onClickCreateSong}
                    >
                        <input className="w-full text-2xl bg-gray-200" type="search" name="song" id="song" placeholder="Song"
                            onChange={onChangeQuerySong}>
                        </input>
                        {!songsDisplayed &&
                            <>
                                <p>We don't have interpretations for this song. Want to create the first version?</p>
                                <button type="submit">Accept</button>
                            </>
                        }
                    </form>}

                {songsDisplayed &&
                    songsDisplayed.map(song => {
                        return <li className="w-11/12 h-14 bg-gray-200" key={song.id}>
                            <button className="px-2 w-full h-full flex items-center justify-start"
                                onClick={
                                    event => {
                                        event.preventDefault()

                                        onClickSong(song)
                                    }}
                            >{song.name}
                            </button>
                        </li>
                    })
                }

                LISTO PARA BORRAR
                {artist && song &&
                    <div>
                        <p className="inline">Song: {song.name}</p>
                        <button className="mx-1 bg-gray-200"
                            onClick={onClickChangeSong}
                        >Change</button>
                    </div>
                }

                LISTO PARA BORRAR
                {artist && song &&
                    <form
                        onSubmit={onSubmitInterpretation}
                    >
                        <textarea className="w-96 h-96" name="textarea" placeholder="write your interpretation here"></textarea>
                        <button type="submit">Save</button>
                    </form>
                }

            </main>
            <Footer userLoggedIn={true} page="create-interpretation" /> */}

{/* // <li className="w-11/12 h-14 bg-gray-200" key={artist.id}>
                    //     <button className="px-2 w-full h-full flex items-center justify-start"
                    //         onClick={
                    //             event => {
                    //                 event.preventDefault()

                    //                 onClickArtist(artist)
                    //             }}
                    //     >{artist.name}
                    //     </button>
                    // </li> */}