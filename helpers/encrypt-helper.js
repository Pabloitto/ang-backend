const crypto = require('crypto')
const algorithm = 'aes-256-ctr'
const password = '133883129cc22eb002ec12ad27a909c59518b047'

function encrypt(obj){
    const json = JSON.stringify(obj)
    const cipher = crypto.createCipher(algorithm,password)
    let crypted = cipher.update(json,'utf8','hex')
    crypted += cipher.final('hex')
    return crypted;
}
   
function decrypt(text){
    const decipher = crypto.createDecipher(algorithm,password)
    let dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8')
    return JSON.parse(dec)
}

module.exports = { encrypt, decrypt }
