const env = require('./env')

const config = {
    local: {
        connectionString: 'mongodb://localhost:27017/cursodb'
    },
    development: {
        connectionString: process.env.CONNECTION_STRING
    }
}

module.exports = function (override) {
    return config[override || env]
}
