const { User, Artist, Song, Interpretation } = require('../models')
const { NotFoundError, ConflictError } = require('errors')
const { validateInterpretationContent } = require('validators')
const { Comment } = require('../models')
const { validateObjectId } = require('../validators')

module.exports = async (user, song, content) => {
    validateObjectId(user)
    validateObjectId(song)
    validateInterpretationContent(content, 'interpretation content')

    const userFounded = await User.findById(user)
    
    if(!userFounded) throw new NotFoundError(`user with id ${user} not found`)

    const songFounded = await Song.findById(song)

    if(!songFounded) throw new NotFoundError(`song with id ${song} not found`)

    const artistFounded = await Artist.findById(songFounded.artist)

    if(!artistFounded) throw new ConflictError(`artists from song with id ${song} does not exist`)
        
    const interpretation = new Interpretation({ user, content })

    songFounded.interpretations.push(interpretation)

    await songFounded.save()
    
    return interpretation._id.toString()
}