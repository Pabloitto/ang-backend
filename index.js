const server = require('./server')
const config = require('./config')()
const init = async () => {
  await server.initDB(config.connectionString)
  server.init(8085)
}

init()
