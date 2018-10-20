const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
    const { headers: { authorization } } = req;
    if (authorization && authorization.split(' ')[0] == 'Token') {
        return authorization.split(' ')[1];
    }
    return null;
}

//add secret in file later
const auth = {
    require: jwt({
        secret: 'jui',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: true,
    }),
    optional: jwt({
        secret: 'jui',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
    })
}

module.exports = auth;