const FireInsuranceController = require('../controller/fireInsuranceController')
const InvoiceController = require('../controller/invoiceController')
const userController = require('../controller/userController')
const { authentication } = require('../middleware/authentication')
const { customerAuth, adminAuth } = require('../middleware/authorization')
const route = require('express').Router()


// USER
route.post('/register', userController.register)
route.post('/login', userController.login)
route.get('/user', authentication, customerAuth, userController.getById)
route.put('/user', authentication, customerAuth, userController.updateData)

// INVOICE
// Dev
route.get('/dev/invoice', InvoiceController.getAll)
// Customer
route.post('/invoice', authentication, customerAuth, InvoiceController.create)
route.get('/invoice', authentication, customerAuth, InvoiceController.getAllCustomer)
route.get('/invoice/checkout/:id', authentication, customerAuth, InvoiceController.getCheckout)
route.get('/invoice/checkout/submit/:id', authentication, customerAuth, InvoiceController.submitCheckout)
// Admin
route.get('/admin/invoice', authentication, adminAuth, InvoiceController.getAllPending)
route.get('/admin/invoice/approve/:id', authentication, adminAuth, InvoiceController.approveRequest)
route.get('/admin/invoice/reject/:id', authentication, adminAuth, InvoiceController.rejectRequest)

// FIRE INSURANCE
// Customer
route.get('/insurance/fire', authentication, FireInsuranceController.getAll)
// Admin
route.get('/admin/insurance/fire', authentication, adminAuth, FireInsuranceController.getAll)
route.post('/admin/insurance/fire', authentication, adminAuth, FireInsuranceController.add)
route.get('/admin/insurance/fire/:id', authentication, adminAuth, FireInsuranceController.getById)
route.put('/admin/insurance/fire/:id', authentication, adminAuth, FireInsuranceController.edit)




module.exports = route
