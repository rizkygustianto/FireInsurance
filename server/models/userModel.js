const { ObjectID } = require("mongodb");
const db = require("../config/mongo");
const users = db.collection('users')

class userModel {
    static findAll() {
        return users.find().toArray()
    }
    static add(payload) {
        return users.insertOne(payload)
    }
    static getById(id) {
        console.log(id);
        return users.findOne({ _id: ObjectID(id) })
    }
    static getByEmail(email) {
        return users.findOne({ email: email })
    }
    static edit(id,params) {
        return users.replaceOne( { _id: ObjectID(id) }, params )
    }
    static delete(id) {
        return users.deleteOne( { _id: ObjectID(id) })
    }
}

module.exports = userModel