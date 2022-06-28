const { Schema, Types: { ObjectId }, trusted } = require('mongoose')
const comment = require('./comment')
const rank = require('./rank')

const interpretation = new Schema({
    user: {
        type: ObjectId,
        require: true,
        ref: 'User'
    },
    content: {
        type: String,
        required: true,
        minlength: 200
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    ranks: [rank],
    comments: [comment],
})

module.exports = interpretation