const { AuthError, NotFoundError } = require("errors")
const { User } = require("../models")
const { validatePassword } = require("validators")
const { validateObjectId } = require('../validators')

module.exports = async (userId, password) => {
    validateObjectId(userId)
    validatePassword(password)

    const result = await User.findById(userId)

    if (result === null) throw new NotFoundError(`user with id ${userId} not found`)

    if (result.password !== password) throw new AuthError('wrong credentials')

    await User.deleteOne({ _id: userId })
}