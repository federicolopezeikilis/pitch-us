const { User } = require('../models')
const { ConflictError } = require('errors')
const { validateUsername, validateEmail, validatePassword } = require('validators')

module.exports = async (username, email, password) => {
    validateUsername(username)
    validateEmail(email)
    validatePassword(password)

    try {
        await User.create({ username, email, password })

    } catch(error) {
        if (error.message.includes('duplicate key error')) {
            if(error.message.includes('username')) throw new ConflictError(`user with username ${username} already exists`)

            else if(error.message.includes('email')) throw new ConflictError(`email ${email} is already registered`)
        }
            
        throw error
    }
}