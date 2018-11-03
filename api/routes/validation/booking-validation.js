const { body } = require('express-validator/check')

const config = {
    bookTour: [
        body('amountBooking')
            .not()
            .isEmpty()
            .withMessage("require amountBooking")
            .isInt({ gt: 0 })
            .withMessage("require number more than zero")
    ]
}

module.exports = config