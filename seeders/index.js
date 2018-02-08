const { DataBaseConnector } = require('../db')
const { seedUsers } = require('./users')

const init = async () => {
  await DataBaseConnector.connect('mongodb://localhost:27017/cursoDB')
  await seedUsers(100)
  await DataBaseConnector.disconnect()
}

init()
