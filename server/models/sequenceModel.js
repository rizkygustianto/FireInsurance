const { ObjectID } = require("mongodb");
const db = require("../config/mongo");
const sequence = db.collection('sequence')

class SequenceModel {
    // static findAll() {
    //     return invoiceSequence.find().toArray()
    // }
    // static add(payload) {
    //     return invoiceSequence.insertOne(payload)
    // }
    // static getById(id) {
    //     console.log(id);
    //     return invoiceSequence.findOne({ _id: ObjectID(id) })
    // }
    // static getByEmail(email) {
    //     return invoiceSequence.findOne({ email: email })
    // }
    // static edit(id,params) {
    //     return invoiceSequence.replaceOne( { _id: ObjectID(id) }, params )
    // }
    static async getNextSequenceValue(sequenceName){
        return sequence.findOneAndUpdate({ _id: sequenceName }, {$inc:{sequence_value:1}});
        // console.log(sequenceDocument, '|||||||| SEQUENCE DOC');
        // return sequenceDocument.sequence_value;
    }
}

module.exports = SequenceModel