const { retrieveArtistsAndSongs } = require('../logic')
const { handleErrorsAndRespond } = require('./helpers')

module.exports = async (req, res) => {
    try {
        const { query: { q: query } } = req

        const results = await retrieveArtistsAndSongs(query)
        
        res.status(200).json(results)
        
    } catch (error) {
        handleErrorsAndRespond(error, res)
    }
}