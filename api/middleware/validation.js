const { validationResult } = require('express-validator/check')

exports.checkValidation = async (req, res, next) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }
    next()
}
