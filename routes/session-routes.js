const express = require('express')
const sessionRouter = express.Router()
const sessionController = require('../controllers/session-controller')()
module.exports = () => {
  sessionRouter.post('/api/session/login', sessionController.login)
  return sessionRouter
}
