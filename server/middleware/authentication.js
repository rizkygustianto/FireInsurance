const {verifyToken} = require('../helpers/jwt')
const User = require('../models/userModel')

const authentication = (req,res,next) => {
    console.log(req.headers);
    const {access_token} = req.headers
    const data = verifyToken(access_token)
    console.log(data, 'data auth');
    User.getById(data.id)
    .then(result => {
        console.log(result, 'auth getbyid result');
        req.UserData = result
        next()
    })
    .catch(err => {
        return res.status(401).json({msg:'invalid user'})
    })
}

module.exports = {authentication}