const Invoice = require('../models/invoiceModel')
const FireInsurance = require('../models/fireInsuranceModel')
const SequenceModel = require('../models/sequenceModel')

class InvoiceController {
    static async getAll(req,res) {
        const get = await Invoice.findAll()
        res.status(200).json(get)
    }
    static async getAllPending(req,res) {
        const get = await Invoice.findAllPending()
        res.status(200).json(get)
    }
    static async getAllCustomer(req,res) {
        const get = await Invoice.findAllCustomer(req.UserData._id)
        res.status(200).json(get)
    }
    static async create(req,res) {
        const sequence = await SequenceModel.getNextSequenceValue('invoiceNumber')
        console.log(sequence,'SEQUENCE');
        let params = {
            invoiceNumber: `K.001.${sequence.value.sequence_value}`,
            coverageType: 'Asuransi Kebakaran',
            coveragePeriod: req.body.coveragePeriod,
            occupation: req.body.occupation,
            propertyPrice: req.body.propertyPrice,
            construction: req.body.construction,
            address: req.body.address,
            city: req.body.city,
            district: req.body.district, //kabupaten
            region: req.body.region,
            earthquake: req.body.earthquake || 'no',
            status: 'checkout',
            customerId: req.UserData._id,
            policyNumber: 'Belum Terbit'
            // insurancePremium: req.body.insurancePremium
        }
        console.log(params,'create invoice');
        const add = await Invoice.add(params)
        res.status(201).json(add)
    }
    static async getCheckout(req,res) {
        // get trx id from insertedId as json response from checkout above
        const checkout = await Invoice.getById(req.params.id)
        console.log(checkout);
        const insuranceParams = await FireInsurance.getByOccupation(checkout.occupation) // should be getById, will fix later if time allows
        console.log(insuranceParams);
        let basePremium = ((checkout.propertyPrice * insuranceParams.insuranceRate) / (1000 * checkout.coveragePeriod))
        let insurancePremium = basePremium + 10000
        checkout.basePremium = basePremium
        checkout.insurancePremium = insurancePremium
        const writeCheckout = await Invoice.edit(req.params.id, checkout)
        res.status(200).json(checkout)
    }
    static async submitCheckout(req,res) {
        const submit = await Invoice.getById(req.params.id)
        submit.status = 'Menunggu Persetujuan'
        // submit.insurancePremium = req.body.insurancePremium
        const writeSubmit = await Invoice.edit(req.params.id, submit)
        res.status(200).json(writeSubmit)
    }
    static async approveRequest(req,res) {
        const sequence = await SequenceModel.getNextSequenceValue('policyNumber')
        let request = await Invoice.getById(req.params.id)
        request.status = 'Sudah Dibayar'
        request.policyNumber = `K.01.001.${sequence.value.sequence_value}`
        console.log(request, 'approve');
        let approve = await Invoice.edit(req.params.id, request)
        res.status(201).json(approve)
    }
    static async rejectRequest(req,res) {
        let request = await Invoice.getById(req.params.id)
        request.status = 'Belum Dibayar'
        request.policyNumber = 'Belum Terbit'
        console.log(request, 'reject');
        let reject = await Invoice.edit(req.params.id, request)
        res.status(201).json(reject)
    }
}

module.exports = InvoiceController