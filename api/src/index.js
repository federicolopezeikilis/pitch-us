require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { connect, disconnect } = require('mongoose')
const {
    /* USERS */
    handleRegisterUser,
    handleAuthenticateUser,
    handleUpdatePassword,
    handleRetrieveUser,
    handleUpdateUser,
    handleUnregisterUser,

    /* TOKEN */
    handleValidateToken,

    /* ARTISTS */
    handleCreateArtist,
    handleRetrieveArtists,
    handleGetTopArtists,

    /* SONGS */
    handleCreateSong,
    handleRetrieveSongs,
    handleRetrieveSongsOfArtist,
    handleRetrieveSong,

    /* ARTISTS AND SONGS */
    handleRetrieveArtistsAndSongs,

    /* INTERPRETATIONS */
    handleAddInterpretationToSong,
    handleRetrieveInterpretationsFromSong,
    handleRetrieveInterpretationFromSong,

    /* RANK */
    handleToggleOrUpdateRankToInterpretation,

    /* SPOTIFY */
    handleRequestSpotifyAccesToken,
    handleCheckSpotifySession
} = require('./handlers')

var XMLHttpRequest = require('xhr2');

global.XMLHttpRequest = XMLHttpRequest

const { env: { MONGODB_URL, PORT = 8080 }, argv: [, , port = PORT] } = process

    ; (async () => {
        await connect(MONGODB_URL)

        console.log(`DB connected on ${MONGODB_URL}`)

        const api = express()

        api.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Headers', '*')
            res.setHeader('Access-Control-Allow-Methods', '*')
            res.setHeader('Access-Control-Allow-Origin', '*')

            next()
        })

        const jsonBodyParser = bodyParser.json()

        const routes = express.Router()

        api.use('/api', routes)

        /* USERS */
        routes.post('/users', jsonBodyParser, handleRegisterUser)
        routes.post('/users/auth', jsonBodyParser, handleAuthenticateUser)
        routes.get('/users/auth', handleValidateToken)
        routes.patch('/users/auth', jsonBodyParser, handleUpdatePassword)
        routes.get('/users', handleRetrieveUser)
        routes.patch('/users', jsonBodyParser, handleUpdateUser)
        routes.delete('/users', jsonBodyParser, handleUnregisterUser)

        /* ARTISTS */
        routes.post('/artists', jsonBodyParser, handleCreateArtist)
        routes.get('/artists', handleRetrieveArtists)
        routes.post('/artists/top', jsonBodyParser, handleGetTopArtists)

        /* SONGS */
        routes.post('/songs', jsonBodyParser, handleCreateSong)
        routes.get('/songs', handleRetrieveSongs)
        routes.get('/songs/:songName/:artistName', handleRetrieveSong)
        routes.get('/songs/:artistName', handleRetrieveSongsOfArtist)

        /* ARTISTS AND SONGS */
        routes.get('/search', handleRetrieveArtistsAndSongs)

        /* INTERPRETATIONS */
        routes.post('/songs/:songId/interpretations', jsonBodyParser, handleAddInterpretationToSong)
        routes.get('/songs/:songName/:artistName/interpretations', handleRetrieveInterpretationsFromSong)
        routes.get('/songs/:songName/artists/:artistName/interpretations/:interpretationId', handleRetrieveInterpretationFromSong)

        /* RANK */
        routes.post('/rank/songs/:songId/interpretations/:interpretationId', jsonBodyParser, handleToggleOrUpdateRankToInterpretation)

        /* SPOTIFY */
        routes.post('/spotify/auth', jsonBodyParser, handleCheckSpotifySession)

        api.listen(port, () => console.log(`API running on port ${port}`))

        process.on('SIGINT', async () =>
            disconnect()
                .then(() => {
                    console.log('\nDB disconnected')

                    process.exit(0)
                })
        )
    })()