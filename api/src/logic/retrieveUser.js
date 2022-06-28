const { User } = require('../models')
const { NotFoundError } = require('errors')
const { validateObjectId } = require('../validators')

module.exports = async userId => {
    validateObjectId(userId)

    const user = await User.findById(userId).lean()

    if (!user) throw new NotFoundError(`user with id ${userId} not found`)

    delete user._id
    delete user.__v
    delete user.password

    return user
}