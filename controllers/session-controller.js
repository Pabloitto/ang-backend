module.exports = () => {
  const login = async (req, res) => {
    console.log(req.body)
    res.send(true)
  }
  return {
    login: login
  }
}
