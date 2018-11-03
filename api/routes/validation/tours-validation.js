const { body } = require('express-validator/check')

const config = {
    tour: [
        body('name')
            .isAlphanumeric()
            .trim()
            .escape()
            .withMessage('only alphabet and number can insert')
            .isLength({ min: 3 })
            .withMessage('require more than 3 charaters')
        , body('price')
            .isFloat({ min: 0 })
            .withMessage('require number more than or equar zero')
        , body('dest')
            .isAlpha()
            .withMessage('require alphabet')
        , body('dayDuration')
            .isNumeric({ min: 0 })
            .withMessage('require number')
        , body('nightDuration')
            .isNumeric({ min: 0 })
            .withMessage('require number')
        , body('startBookDate')
            //check date
            .matches(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/)
            .withMessage("require dd/mm/yyyy")
        , body('startBookTime')
            //check time
            .matches(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
            .withMessage("require time 10:00")
        , body('endBookDate')
            .matches(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/)
            .withMessage("require dd/mm/yyyy")
        , body('endBookTime')
            .matches(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
            .withMessage("require time 10:00")
        , body('departDate')
            .matches(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/)
            .withMessage("require dd/mm/yyyy")
        , body('returnDate')
            .matches(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/)
            .withMessage("require dd/mm/yyyy")
        , body('seat')
            .isNumeric({ min: 0 })
            .withMessage('require number')
        , body('food')
            .isAlphanumeric()
            .trim()
            .escape()
            .withMessage('only alphabet and number can insert')
        , body('detail')
            .isAlphanumeric()
            .trim()
            .escape()
            .withMessage('only alphabet and number can insert')
        , body('highlight')
            .isAlphanumeric()
            .trim()
            .escape()
            .withMessage('only alphabet and number can insert')
    ]
}
//.matches(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/)
module.exports = config