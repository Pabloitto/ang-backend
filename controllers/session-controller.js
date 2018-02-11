const User = require('../models/User')
const { encrypt } = require('../helpers/encrypt-helper')
module.exports = () => {
  const login = async (req, res) => {
    try {
      const {email, password} = req.body
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(404).send({
          success: false
        }) 
      }
      if(user.validPassword(password) === true) {
        const cookie = encrypt({
          name: user.name,
          email: user.email
        })
        console.log(cookie)
        res.cookie('user_sid', cookie, {maxAge: 60000});
        return res.send({
          success: true
        })
      }
      return res.status(400).send({
        success: false
      })
    } catch (err) {
      console.log(err)
      return res.status(500).send({
        success: false
      })
    }
  }
  return {
    login: login
  }
}
