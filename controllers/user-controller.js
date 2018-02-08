const User = require('../models/User')

module.exports = () => {
  const fetchUsers = async (req, res) => {
    const result = await User.find({})
    res.send(result.map(({name, email}) => {
      return {name, email}
    }))
  }
  const fetchUserById = async (req, res) => {
    const { userId } = req.query
    const result = await User.findOne(userId)
    res.send({name: result.name, email: result.email})
  }
  const save = async (req, res) => {
    const user = new User(req.body)
    const result = await user.save()
    res.send(result)
  }
  return {
    fetchUsers: fetchUsers,
    fetchUserById: fetchUserById,
    save: save
  }
}
