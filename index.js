const server = require('./server')
const config = require('./config')()
const init = async () => {
  await server.initDB(config.connectionString)
  server.init(process.env.PORT || 8085)
}

init()
