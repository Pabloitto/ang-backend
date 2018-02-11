const User = require('../models/User')
const  {decrypt } = require('../helpers/encrypt-helper')

function clearCookie (app) {
    app.use((req, res, next) => {
        if (req.cookies.user_sid && !req.session.user) {
            res.clearCookie('user_sid')       
        }
        next()
    })
}

async function sessionFilter (req, res, next) {
    if (req.cookies.user_sid) {
        const data = decrypt(req.cookies.user_sid)
        const user = await User.findOne({email: data.email})
        if (!user) {
            return res.status(401).json({
                error: 'Session expired'
            })
        }
    } else {
        return res.status(401).json({
            error: 'Session expired'
        })
    }
    next()
}

module.exports = {
    sessionFilter,
    clearCookie
}
