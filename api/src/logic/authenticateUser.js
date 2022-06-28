const { User } = require('../models')
const { AuthError } = require('errors')
const { validatePassword, validateEmail } = require('validators')

module.exports = async (email, password) => {
    validateEmail(email)
    validatePassword(password)

    const user = await User.findOne({ email, password })

    if (!user) throw new AuthError('wrong credentials')

    return user.id
}