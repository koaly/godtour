/**
 * Show filter user from status with request username async function
 * @param {payload} status status of user
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @param {void}
 */
exports.getFilterUser = require("./getFilterUsers");

/**
 * One user with request username async function
 * @param {param} username username of user that want to request
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @returns {void}
 */
exports.getOneUser = require("./getOneUser");
