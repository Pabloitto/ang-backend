const should = require('should')
const axios = require('axios')
const User = require('../../../models/User')
const server = require('../../../server')
const { DataBaseConnector } = require('../../../db')
const DB_URL = 'mongodb://127.0.0.1:27017/dbTest'
const getAddress = () => {
  const instance = server.getInstance()
  const currentAddress = instance.address()
  const { address, port } = currentAddress
  const host = address === '::' ? 'localhost' : address
  return `http://${host}:${port}`
}
let HOST = ''
describe('api/users', function () {
  before(async () => {
    await server.init()
    await server.initDB(DB_URL)
    HOST = getAddress()
  })
  after(async () => {
    await DataBaseConnector.disconnect()
    const instance = server.getInstance()
    instance.close()
  })
  afterEach(async () => {
    await User.remove({})
  })
  it('should call to save new users with post api/users and get from database', async () => {
    const usr = { name: 'test', email: 'test@test.com' }
    await axios.post(`${HOST}/api/users`, usr)
    const usersOnDB = await User.find({})
    should.equal(usersOnDB[0].name, usr.name)
    should.equal(usersOnDB[0].email, usr.email)
    should.equal(usersOnDB.length, 1)
  })
  it('should call to api/users and return valid users', async () => {
    const usr = { name: 'test', email: 'test@test.com' }
    await new User(usr).save()
    const response = await axios.get(`${HOST}/api/users`)
    should.deepEqual(response.data, [usr])
    should.equal(response.status, 200)
  })
  it('should post a new user and get the same user using GET and POST APIs', async () => {
    const usr = { name: 'test', email: 'test@test.com' }
    const result = await axios.post(`${HOST}/api/users`, usr)
    const userId = result.data._id
    const response = await axios.get(`${HOST}/api/users/${userId}`)
    should.deepEqual(response.data, usr)
    should.equal(response.status, 200)
  })
})
