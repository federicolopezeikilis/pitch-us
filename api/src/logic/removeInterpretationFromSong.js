const { AuthError, NotFoundError } = require("errors")
const { User, Artist, Song } = require("../models")
const { validatePassword } = require("validators")
const { validateObjectId } = require('../validators')

module.exports = async (userId, password, songId, interpretationId) => {
    validateObjectId(userId)
    validatePassword(password)
    validateObjectId(interpretationId)
    debugger
    const userFounded = await User.findById(userId)

    if (userFounded === null) throw new NotFoundError(`user with id ${userId} not found`)

    if (userFounded.password !== password) throw new AuthError('wrong credentials')

    const songFounded = await Song.findById(songId)

    if (!songFounded) throw new NotFoundError(`song with id ${songId} not found`)

    const indexOfInterpretation = songFounded.interpretations.findIndex(interpretation => interpretation._id.toString() === interpretationId)

    if(indexOfInterpretation === -1) throw new NotFoundError(`interpretation with id ${interpretationId} not found`)

    songFounded.interpretations.splice(indexOfInterpretation, 1)

    await songFounded.save()
}