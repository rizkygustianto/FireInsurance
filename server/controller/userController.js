const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const compare = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static async register(req,res) {
        const params = {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || 'customer'
        }

        // salting & hashing
        const salt = bcrypt.genSaltSync(8)
        const hash = bcrypt.hashSync(params.password, salt)
        params.password = hash

        const add = User.add(params)
        res.status(201).json(add)
    }
    static async login(req,res) {
        let { email,password } = req.body
        let user = await User.getByEmail(email)
        if (!user) {
            return res.status(401).json({msg: 'Invalid email/password'})
        } else {
            const validation = compare(password, user.password)
            if (validation) {
                let payload = {
                    id: user.id,
                    email: user.email
                }
                let access_token = generateToken(payload)
                return res.status(200).json({
                    access_token: access_token,
                    id: user.id,
                    email: user.email
                })
            } else {
                return res.status(400).json({msg:'Internal server error'})
            }
        }
    }
}

module.exports = UserController