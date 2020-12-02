const User = require('../models/userModel')

const adminAuth = (req,res,next) => {
    // console.log(req.UserData);
    const {id} = req.UserData
    // console.log(id);
    User.getById(id)
    .then(result => {
        // console.log(result, 'ini findbypk');
        if (result && result.role === 'admin') {
            next()
        } else {
            return res.status(403).json({msg:'unauthorized access'})
        }
    })
    .catch(err => {
        return res.status(403).json({msg:'unauthorized access'})
    })
}

const customerAuth = (req,res,next) => {
    // console.log(req.UserData);
    const {id} = req.UserData
    // console.log(id);
    User.getById(id)
    .then(result => {
        // console.log(result, 'ini findbypk');
        if (result && result.role === 'customer') {
            next()
        } else {
            return res.status(403).json({msg:'unauthorized access'})
        }
    })
    .catch(err => {
        return res.status(403).json({msg:'unauthorized access'})
    })
}

module.exports = {adminAuth, customerAuth}