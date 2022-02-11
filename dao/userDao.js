const User = require('../models/user')

function getUserByName(name, projection) {
    return User.findOne({"name": name}, projection)
}

function createUser(user) {
    const userToSave = new User(user)
    return User.create(userToSave)
}

module.exports = {getUserByName, createUser}