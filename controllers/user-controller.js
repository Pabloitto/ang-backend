const User = require('../models/User')

module.exports = () => {
  const fetchUsers = async (req, res) => {
    const result = await User.find({})
    res.send(result.map(({_id, name, email}) => {
      return {_id, name, email}
    }))
  }
  const fetchUserById = async (req, res) => {
    try {
      const { userId } = req.params
      const result = await User.findOne({_id: userId})
      if (!result) {
        return res.status(404).send({
          error: 'User not found'
        })
      }
      res.send({_id: result._id, name: result.name, email: result.email})
    } catch (err) {
      res.status(500).send({
        error: err
      })
    }
  }
  const save = async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        confirmPassword
      } = req.body

      if (password === confirmPassword) {
        const user = new User()
        user.name = name
        user.email = email
        user.password = user.generateHash(password)
        const result = await user.save()
        res.send(result._id)
      } else {
        res.status(400).send({
          error: 'Password not match'
        })
      }
    } catch (err) {
      res.status(500).send({
        error: 'Something is wrong'
      })
    }
  }
  return {
    fetchUsers: fetchUsers,
    fetchUserById: fetchUserById,
    save: save
  }
}
