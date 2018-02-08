const { DataBaseConnector } = require('../db')
const { seedUsers } = require('./users')
const config = require('../config')()

const init = async () => {
  await DataBaseConnector.connect(config.connectionString)
  await seedUsers(100)
  await DataBaseConnector.disconnect()
}

init()
