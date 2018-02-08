const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/user-controller')()

module.exports = () => {
  userRouter.get('/api/users', userController.fetchUsers)
  userRouter.get('/api/users/:userId', userController.fetchUserById)
  userRouter.post('/api/users', userController.save)
  return userRouter
}