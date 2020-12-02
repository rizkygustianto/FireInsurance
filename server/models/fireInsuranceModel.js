// every type of insurance insurance has different properties and therefore should be considered a standalone object

const db = require("../config/mongo");
const fireInsurance = db.collection('firefireInsurance')

class FireInsuranceModel {
    static findAll() {
        return fireInsurance.find().toArray()
    }
    static add(payload) {
        return fireInsurance.insertOne(payload)
    }
    static getById(id) {
        return fireInsurance.findOne({ _id: ObjectId(id) })
    }
    static edit(id,params) {
        return fireInsurance.replaceOne( { _id: ObjectId(id) }, params )
    }
    static delete(id) {
        return fireInsurance.deleteOne( { _id: ObjectId(id) })
    }
}

module.exports = FireInsuranceModel