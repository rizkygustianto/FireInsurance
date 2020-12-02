const bcrypt = require('bcryptjs')

const compare = (password,hashedPassword) => {
    let result = bcrypt.compareSync(password,hashedPassword)
    return result
}

module.exports = compare