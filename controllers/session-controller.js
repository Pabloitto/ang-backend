module.exports = () => {
  const login = async (req, res) => {
    const {email, password} = req.body
    if(email === 'admin@admin.com' && password === 'admin') {
      return res.send(true)
    }
    return res.send(false)
  }
  return {
    login: login
  }
}
