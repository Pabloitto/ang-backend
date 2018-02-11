const {clearCookie} = require('./auth')

module.exports = function (app) {
    clearCookie(app)
}
