module.exports = function () {
    return process.env.ENV || 'local'
}()
