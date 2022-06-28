const handleRequestSpotifyAccesToken = require('./handleRequestSpotifyAccesToken');

module.exports = {
    /* USERS */ 
    handleRegisterUser: require('./handleRegisterUser'),
    handleAuthenticateUser: require('./handleAuthenticateUser'),
    handleUpdatePassword: require('./handleUpdatePassword'),
    handleRetrieveUser: require('./handleRetrieveUser'),
    handleUpdateUser: require('./handleUpdateUser'),
    handleUnregisterUser: require('./handleUnregisterUser'),

    /* VALIDATE TOKEN */
    handleValidateToken: require('./handleValidateToken'),

    /* ARTISTS */
    handleCreateArtist: require('./handleCreateArtist'),
    handleRetrieveArtists: require('./handleRetrieveArtists'),
    handleGetTopArtists: require('./handleGetTopArtists'),

    /* SONGS */
    handleCreateSong: require('./handleCreateSong'),
    handleRetrieveSongs: require('./handleRetrieveSongs'),
    handleRetrieveSong: require('./handleRetrieveSong'),
    handleRetrieveSongsOfArtist: require('./handleRetrieveSongsOfArtist'),
    
    /* ARTISTS AND SONGS */
    handleRetrieveArtistsAndSongs: require('./handleRetrieveArtistsAndSongs'),

    /* INTERPRETATIONS */
    handleAddInterpretationToSong: require('./handleAddInterpretationToSong'),
    handleRetrieveInterpretationsFromSong: require('./handleRetrieveInterpretationsFromSong'),
    handleRetrieveInterpretationFromSong: require('./handleRetrieveInterpretationFromSong'),

    /* RANK */
    handleToggleOrUpdateRankToInterpretation: require('./handleToggleOrUpdateRankToInterpretation'),

    /* SPOTIFY */
    handleRequestSpotifyAccesToken: require('./handleRequestSpotifyAccesToken'),
    handleCheckSpotifySession: require('./handleCheckSpotifySession')
}

