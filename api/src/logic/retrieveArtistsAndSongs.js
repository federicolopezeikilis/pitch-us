const retrieveArtists = require('./retrieveArtists')
const retrieveSongs = require('./retrieveSongs')

module.exports = async query => {
    const artists = await retrieveArtists(query)
    const songs = await retrieveSongs(query)

    return { artists, songs }
}