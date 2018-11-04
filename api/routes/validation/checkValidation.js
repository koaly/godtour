const { validationResult } = require('express-validator/check')
checkValidation = async (req, res, next) => {
    const errors = await validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }
    next()
}

module.exports = checkValidation