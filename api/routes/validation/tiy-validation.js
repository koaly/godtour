const { body } = require('express-validator/check');

const config = {
    tiy: [
        body('minPrice')
            .not()
            .isEmpty()
            .withMessage('require property')
            .isNumeric({ min: 0 })
            .withMessage('require number more than or equal to zero')
        , body('maxPrice')
            .not()
            .isEmpty()
            .withMessage('require property')
            .isNumeric({ min: 0 })
            .withMessage('require number more than or equal to zero')
        , body('minDuration')
            .not()
            .isEmpty()
            .withMessage('require property')
            .isNumeric({ min: 0 })
            .withMessage('require number more than or equal to zero')
        , body('maxDuration')
            .not()
            .isEmpty()
            .withMessage('require property')
            .isNumeric({ min: 0 })
            .withMessage('require number more than or equal to zero')
        , body('name')
            .not()
            .isEmpty()
            .withMessage('require property')
            .isAlphanumeric()
            .withMessage('only alphabet or number is allowed')
        , body('dest')
            .not()
            .isEmpty()
            .withMessage('require property')
            .isAlphanumeric()
            .withMessage('only alphabet or number is allowed')
        , body('startFreeDate')
            .not()
            .isEmpty()
            .withMessage('require property')
            .matches(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)
            .withMessage("invalid date (dd/mm/yyyy)")
        , body('endFreeDate')
            .not()
            .isEmpty()
            .withMessage('require property')
            .matches(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)
            .withMessage("invalid date (dd/mm/yyyy)")
        , body('food')
            .withMessage('require property')
            .isAlphanumeric()
            .withMessage('only alphabet or number is allowed')
        , body('detail')
            .isAlphanumeric()
            .withMessage('only alphabet or number is allowed')
        , body('highlight')
            .isAlphanumeric()
            .withMessage('only alphabet or number is allowed')
    ]
}
module.exports = config