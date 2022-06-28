const { User } = require('../models')
const { NotFoundError, AuthError } = require('errors')
const { validatePassword} = require('validators')
const { validateObjectId } = require('../validators')


module.exports = async (userId, oldPassword, password) => {
    validateObjectId(userId)
    validatePassword(oldPassword, 'previous password')
    validatePassword(password, 'new password')

    if (oldPassword === password) throw new ConflictError('previous and new password are the same')

    const user = await User.findById(userId)

    if(!user) throw new NotFoundError(`user with id ${userId} not found`)
    
    if(user.password !== oldPassword) throw new AuthError('wrong credentials')

    const result = await User.updateOne({ _id: userId }, { $set: { password } })

    if (result.matchedCount === 0) throw new NotFoundError(`user with id ${userId} not found`)
}