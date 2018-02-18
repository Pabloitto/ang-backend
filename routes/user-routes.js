const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/user-controller')()
const { sessionFilter } = require('../middlewares/auth')
module.exports = () => {
  userRouter.get('/api/users', userController.fetchUsers)
  userRouter.get('/api/users/:userId', userController.fetchUserById)
  userRouter.delete('/api/users/:userId', userController.deleteUser)
  userRouter.post('/api/users', userController.save)
  userRouter.patch('/api/users', userController.update)
  return userRouter
}
