const FireInsurance = require('../models/fireInsuranceModel')

class FireInsuranceController {
    static async add(req,res) {
        console.log('add fire insurance');
        let params = {
            occupationType: req.body.occupationType,
            insuranceRate: req.body.insuranceRate 
        }
        const add = await FireInsurance.add(params)
        res.status(201).json(add)
    }
    static async edit(req,res) {
        let params = {
            occupationType: req.body.occupationType,
            insuranceRate: req.body.insuranceRate 
        }
        const edit = await FireInsurance.edit(req.params.id, params)
        res.status(201).json(edit)
    }
    static async getById(req,res) {
        const getById = await FireInsurance.getById(req.params.id)
        res.status(200).json(getById)
    }
    static async getAll(req,res) {
        const getAll = await FireInsurance.findAll()
        res.status(200).json(getAll)
    }
}

module.exports = FireInsuranceController