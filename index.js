const server = require('./server')

const init = async () => {
  await server.initDB('mongodb://localhost:27017/cursoDB')
  server.init(8085)
}

init()
