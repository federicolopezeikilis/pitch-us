const { FormatError } = require("errors")
const validateStringNoteEmptyOrBlank = require("./validateStringNoteEmptyOrBlank")

module.exports = content => {
    validateStringNoteEmptyOrBlank(content, 'interpretation content')
    
    if(content.length < 200) throw new FormatError('interpretation content has less than 200 characters')
}