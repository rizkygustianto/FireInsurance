const db = require("../config/mongo");
const invoice = db.collection('invoice')

class invoiceModel {
    static findAll() {
        return invoice.find().toArray()
    }
    static add(payload) {
        return invoice.insertOne(payload)
    }
    static getById(id) {
        return invoice.findOne({ _id: ObjectId(id) })
    }
    static edit(id,params) {
        return invoice.replaceOne( { _id: ObjectId(id) }, params )
    }
    static delete(id) {
        return invoice.deleteOne( { _id: ObjectId(id) })
    }
}

module.exports = invoiceModel