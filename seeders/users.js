const faker = require('faker')
const User = require('../models/User')
const generate = n => {
  return Array(n).fill().map(() => {
    const user = {
      name: faker.name.findName(),
      email: faker.internet.email()
    }
    return new User(user).save()
  })
}
const seed = async (n) => {
  await User.remove({})
  const allPromises = generate(n)
  return Promise.all(allPromises)
}
module.exports = {
  seedUsers: seed
}
