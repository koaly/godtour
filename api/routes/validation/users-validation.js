const { body } = require('express-validator/check');

const config = {
    login: [
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('email is invaild'),
        body('password')
            .exists()
            .withMessage('require password'),
    ],
    signup: [
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('email is invaild'),
        body('password')
            .exists()
            .withMessage('require password'),
        body('username')
            .isLength({ min: 3 })
            .trim()
            .escape()
            .withMessage('require string more than 3 charater'),
        body('displayName')
            .isLength({ min: 3 })
            .trim()
            .escape()
            .withMessage('require string more than 3 charater'),
        body('gender')
            .isIn(['male', 'female', 'unknown'])
            .withMessage('request only field male female or unknown')
    ],
    currentEdit: [
        body('displayName')
            .isLength({ min: 3 })
            .trim()
            .escape()
            .withMessage('require string more than 3 charater'),
        body('gender')
            .isIn(['male', 'female', 'unknown'])
            .withMessage('request only field male female or unknow')
    ]
}
module.exports = config