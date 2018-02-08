const mongoose = require('mongoose')

class DataBaseConnector {
  static async connect (connectionString) {
    return new Promise((resolve, reject) => {
      mongoose.connect(connectionString, (error) => {
        if (error) {
          reject(error)
          return
        }
        console.log('Connected to MongoDB')
        resolve()
      })
    })
  }
  static async disconnect () {
    return new Promise((resolve, reject) => {
      mongoose.disconnect(error => {
        if (error) {
          reject(error)
          return
        }
        console.log('Disconnected to MongoDB')
        resolve()
      })
    })
  }
}

const getInstance = () => new DataBaseConnector()

module.exports = {
  DataBaseConnector,
  getInstance
}
