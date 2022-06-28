const { expect } = require('chai')
const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { AuthError, NotFoundError } = require('errors')
const { User } = require('../models')
const { unregisterUser } = require('./')

describe('unregisterUser', () => {
    before(() => connect('mongodb://localhost:27017/notes-db-test'))

    beforeEach(() => User.deleteMany())

    describe('on existing user', () => {
        let user

        beforeEach(async () => {
            user = User({ username: 'wendypan', email: 'wendypan@gmail.com', password: 'Passw0rd' })

            await user.save()
        })

        it('succeeds on correct password and token', async () => {
            await unregisterUser(user.id, user.password)

            const result = await User.findById(user.id)

            expect(result).to.be.null
        })

        it('fails on incorrect password and correct token', async () => {
            try {
                await unregisterUser(user.id, 'Wr0ngPass')

                throw new Error('it should not reach this point')
            } catch (error) {
                expect(error).to.be.instanceOf(AuthError)
                expect(error.message).to.equal('wrong credentials')
            }
        })

        it('fails on incorrect token and correct password', async () => {
            const wrongUserId = new ObjectId().toString()

            try {
                await unregisterUser(wrongUserId, 'Passw0rd')

                throw new Error('it should not reach this point')

            } catch (error) {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal(`user with id ${wrongUserId} not found`)
            }
        })
    })

    describe('on unexisting user', () => {
        it('fails on incorrect token and password', async () => {
            const wrongUserId = new ObjectId().toString()

            try {
                await unregisterUser(wrongUserId, 'Passw0rd')
                throw new Error('it should not reach this point')

            } catch (error) {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal(`user with id ${wrongUserId} not found`)
            }
        })
    })
    afterEach(() => User.deleteMany())

    after(() => disconnect())
})