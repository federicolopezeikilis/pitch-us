const { connect, disconnect } = require('mongoose')
const { User } = require('../models')
const { ConflictError } = require('errors')
const { registerUser } = require('./')
const { expect } = require('chai')

describe('registerUser', () => {
    before(() => connect('mongodb://localhost:27017/pitch-us-test'))

    beforeEach(() => {
        User.deleteMany()

        User.create({ username: 'wendypan', email: 'wendypan@gmail.com', password: 'Passw0rd' })
    })

    it('succeeds on correct credentials', async () => {
        const result = await registerUser('peterpan', 'peterpan@gmail.com', 'Passw0rd')

        expect(result).to.be.undefined

        const user = await User.findOne({ username: 'peterpan' })

        expect(user.username).to.equal('peterpan')
        expect(user.email).to.equal('peterpan@gmail.com')
        expect(user.password).to.equal('Passw0rd')
    })

    it('fails when username already exists', async () => {
        try {
            await registerUser('wendypan', 'otheremail@gmail.com', 'Passw0rd')

        } catch (error) {
            expect(error).to.be.instanceOf(ConflictError)
            expect(error.message).to.equal(`user with username wendypan already exists`)
        }
    })

    it('fails when email is already registerd', async () => {
        try {
            await registerUser('otheruser', 'wendypan@gmail.com', 'Passw0rd')

        } catch (error) {
            expect(error).to.be.instanceOf(ConflictError)
            expect(error.message).to.equal(`email wendypan@gmail.com is already registered`)
        }
    })

    afterEach(() => User.deleteMany())

    after(() => disconnect())
})