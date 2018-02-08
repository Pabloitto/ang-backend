const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { DataBaseConnector } = require('./db')
let server = null

const init = async (port = 0) => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(express.static(path.resolve(__dirname, 'public')))
  initRoutes()
  return startServer(port)
}

const initRoutes = () => {
  const userRoutes = require('./routes/user-routes')()
  const sessionRoutes = require('./routes/session-routes')()
  app.use('/', userRoutes)
  app.use('/', sessionRoutes)
}

const initDB = (connectionString) => {
  return DataBaseConnector.connect(connectionString)
}

const startServer = (port) => {
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log('Node app is running on port', port)
      resolve(app.get('port'))
    })
  })
}

const getInstance = () => server

module.exports = {
  getInstance: getInstance,
  initDB: initDB,
  init: init
}
