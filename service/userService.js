const userDao = require("../dao/userDao")
const {handleError} = require("../utils/serviceUtils")

async function registerUser(body) {
    try {
        const data = await userDao.getUserByName(body.name, "_id name").then(data => {
            return data
        })
        if (data === null || data === undefined) {
            const createdUser = await userDao.createUser(body)
            return {name: createdUser.name}
        } else {
            handleError(409, "User already exists", "")
        }
    } catch (err) {
        handleError(500, "Registration failed ", err)
    }
}

async function loginUser(name, pass) {
    try {
        const data = await userDao.getUserByName(name, "_id name pass").then(data => {
            return data
        })
        if (data === null || data === undefined) {
            handleError(404, "User not registered", "")
        } else if (data.pass !== pass) {
            handleError(409, "Wrong password", "")
        } else {
            return {name: data.name}
        }
    } catch (err) {
        handleError(500, "Login failed ", err)
    }
}

module.exports = {registerUser, loginUser}