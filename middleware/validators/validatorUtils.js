const invalidBodyParam = (param) => {
    return param === null || param === undefined
}

const missingBody = (req, res) => {
    if (req.body === undefined || Object.keys(req.body).length === 0) {
        console.error("%s ERROR Missing request body.", new Date().toISOString());
        res.status(400).send({error: "Missing request body"});
    }
}

module.exports = {invalidBodyParam, missingBody}