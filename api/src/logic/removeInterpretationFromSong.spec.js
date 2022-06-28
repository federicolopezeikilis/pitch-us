const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Artist, Song, Interpretation } = require('../models')
const { NotFoundError, AuthError, FormatError } = require('errors')
const { removeInterpretationFromSong } = require('./')
const { expect } = require('chai')
const { validateObjectId } = require('../validators')

describe('removeInterpretationFromSong', () => {

    before(() => connect('mongodb://localhost:27017/pitch-us-test'))

    let user, artist, song, interpretation

    const interpretationContent = `E5
        Pobreza en los estómagos
              C5                    RIFF1
        Más pobreza en la cabeza
        E5                            C5          RIFF1
        No queda nada a salvo de este gran error
        E5
        El mundo sigue así
              C5                 RIFF1
        Tan terrible y abrumado
        E5                          C5               RIFF2
        Que sentirte a mi lado me hará mucho mejor`

    beforeEach(async () => {
        await Song.deleteMany()
        await Artist.deleteMany()
        await User.deleteMany()

        user = await User.create({ username: 'wendypan', email: 'wendypan@gmail.com', password: 'Passw0rd' })
        artist = await Artist.create({ name: 'La Renga', genres: [Artist.ROCK], country: 'AR' })
        interpretation = new Interpretation({ content: interpretationContent })
        debugger
        song = await Song.create({ artist: artist._id.toString(), name: 'A tu lado', genres: [Song.ROCK], album: 'Detonador de sueños', date: new Date(2003, 0), interpretations: [interpretation] })
    })

    it('fails on incorrect user', async () => {

        const wrongUserId = new ObjectId().toString()

        try {
            const result = await removeInterpretationFromSong(wrongUserId, user.password, song._id.toString(), interpretation._id.toString())

            throw new Error('it should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceof(NotFoundError)
            expect(error.message).to.equal(`user with id ${wrongUserId} not found`)
        }
    })

    it('fails on incorrect song', async () => {
        const wrongSongId = new ObjectId().toString()

        try {
            const result = await removeInterpretationFromSong(user._id.toString(), user.password, wrongSongId, interpretation._id.toString())

            throw new Error('it should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceof(NotFoundError)
            expect(error.message).to.equal(`song with id ${wrongSongId} not found`)
        }
    })

    it('fails on incorrect interpretation', async () => {
        const wrongInterpretationId = new ObjectId().toString()

        try {
            const result = await removeInterpretationFromSong(user._id.toString(), user.password, song._id.toString(), wrongInterpretationId)

            throw new Error('it should not reach this point')
        } catch (error) {
            expect(error).to.be.instanceof(NotFoundError)
            expect(error.message).to.equal(`interpretation with id ${wrongInterpretationId} not found`)
        }
    })

    it('succeeds on correct user, artist, song and interpretation', async () => {
        const result = await removeInterpretationFromSong(user._id.toString(), user.password, song._id.toString(), interpretation._id.toString())

        expect(result).to.be.undefined

        const savedSong = await Song.findById(song._id)

        expect(savedSong.interpretations).to.have.length(0)
    })

    afterEach(async () => {
        await Song.deleteMany()
        await Artist.deleteMany()
        await User.deleteMany()
    })

    after(() => disconnect())
})