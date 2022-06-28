module.exports = {
    /* USERS */
    registerUser: require('./registerUser'),
    authenticateUser: require('./authenticateUser'),
    userExists: require('./userExists'),
    updatePassword: require('./updatePassword'),
    retrieveUser: require('./retrieveUser'),
    updateUser: require('./updateUser'),
    unregisterUser: require('./unregisterUser'),

    /* ARTISTS */
    createArtist: require('./createArtist'),
    retrieveArtists: require('./retrieveArtists'),
    getTopArtists: require('./getTopArtists'),

    /* SONGS */
    createSong: require('./createSong'),
    retrieveSongs: require('./retrieveSongs'),
    retrieveSongsOfArtist: require('./retrieveSongsOfArtist'),
    retrieveSong: require('./retrieveSong'),

    /* ARTISTS AND SONGS */
    retrieveArtistsAndSongs: require('./retrieveArtistsAndSongs'),

    /* INTEPRRETATIONS */
    addInterpretationToSong: require('./addInterpretationToSong'),
    retrieveInterpretationsFromSong: require('./retrieveInterpretationsFromSong'),
    retrieveInterpretationFromSong: require('./retrieveInterpretationFromSong'),
    removeInterpretationFromSong: require('./removeInterpretationFromSong'),

    /* RANK */
    toggleOrUpdateRankToInterpretation: require('./toggleOrUpdateRankToInterpretation'),

    /* SPOTIFY */
    checkSpotifySession: require('./checkSpotifySession'),
    requestSpotifyAccessToken: require('./requestSpotifyAccessToken')
}