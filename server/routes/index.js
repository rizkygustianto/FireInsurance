const userController = require('../controller/userController')
const route = require('express').Router()


// USER
route.post('/register', userController.register)
route.post('/login', userController.login)




module.exports = route
