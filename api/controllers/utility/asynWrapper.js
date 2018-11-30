/**
 *  Warps express.js async function with catch error
 * @param {Function} asyncFn async function for express
 * @param {Object} req  express request object
 * @param {Object} res express response object
 * @returns {void}
 */

const asynWrapper = (asyncFn, req, res) => {
  asyncFn(req, res).catch(e => {
    console.log(e);
    res.status(e.status || 500).json({
      error: {
        msg: e.message
      }
    });
  });
};
module.exports = asynWrapper;
