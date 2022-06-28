const { Song, Artist } = require("../models")
const { validateObjectId } = require('../validators')
const { NotFoundError } = require('errors')
const { validateStringNotEmptyOrBlank } = require('validators')

module.exports = async (songName, artistName) => {
    validateStringNotEmptyOrBlank(songName)
    validateStringNotEmptyOrBlank(artistName)
    
    const reArtist = new RegExp(artistName)

    const artist = await Artist.findOne({ name: { $regex: reArtist, $options: 'i' } })

    if (!artist) throw new NotFoundError(`artist ${artistName} not found`)

    const reSong = new RegExp(songName)

    const song = await Song.findOne({ name: { $regex: reSong, $options: 'i' }, artist: artist._id }).populate({ path: 'interpretations', populate: { path: 'user', select: 'username' } }).lean()

    if (!song) throw new NotFoundError(`song ${songName} not found`)

    const interpretations = song.interpretations.map(interpretation => {
        interpretation.id = interpretation._id.toString()

        delete interpretation._id
        delete interpretation.__v

        return interpretation
    })

    return interpretations
}