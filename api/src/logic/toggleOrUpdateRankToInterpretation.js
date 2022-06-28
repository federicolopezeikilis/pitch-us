const { User, Artist, Song, Rank } = require('../models')
const { NotFoundError, ConflictError } = require('errors')
const { validateRank } = require('validators')
const { validateObjectId } = require('../validators')

module.exports = async (userId, songId, interpretationId, amount) => {
    validateObjectId(userId)
    validateObjectId(songId)
    validateObjectId(interpretationId)
    validateRank(amount)

    const userFounded = await User.findById(userId)

    if (!userFounded) throw new NotFoundError(`user with id ${userId} not found`)

    const songFounded = await Song.findById(songId)

    if (!songFounded) throw new NotFoundError(`song with id ${songId} not found`)

    const artistFounded = await Artist.findById(songFounded.artist)

    if (!artistFounded) throw new ConflictError(`artists from song with id ${songId} does not exist`)
    
    const indexOfInterpretation = songFounded.interpretations.findIndex(interpretation => interpretation._id.toString() === interpretationId)

    if (indexOfInterpretation === -1) throw new NotFoundError(`interpretation with id ${interpretationId} not found`)

    if(songFounded.interpretations[indexOfInterpretation].user.toString() === userId) throw new ConflictError(`user with id ${userId} is not allowed to rank his own interpretation with id ${interpretationId}`)

    const indexOfRank = songFounded.interpretations[indexOfInterpretation].ranks.findIndex(rank => rank.user.toString() === userId)

    if (indexOfRank !== -1) {
        if (songFounded.interpretations[indexOfInterpretation].ranks[indexOfRank].amount === amount) {
            songFounded.interpretations[indexOfInterpretation].ranks.splice(indexOfRank, 1)

            await songFounded.save()
            
            return
        }

        songFounded.interpretations[indexOfInterpretation].ranks.splice(indexOfRank, 1)
    }

    const rank = new Rank({ user: userId, amount: amount })

    songFounded.interpretations[indexOfInterpretation].ranks.push(rank)

    await songFounded.save()
}