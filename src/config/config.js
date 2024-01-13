const serverSettings = {
  port: process.env.PORT || 8001,
  basePath: process.env.BASE_PATH || ''
}

const httpCode = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  TOKEN_EXPIRED: 409,
  UNKNOWN_ERROR: 520,
  FORBIDDEN: 403,
  ADMIN_REQUIRE: 406,
  SIGNATURE_ERROR: 411,
  UNAUTHORIZED: 401,
  USER_BLOCK: 412,
  DEVICE_BLOCK: 413
}

const dbSettings = {
  db: process.env.DB || 'hddt-customer',
  user: process.env.DB_USER || '',
  pass: process.env.DB_PASS || '',
  repl: process.env.DB_REPLS || '',
  servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(',') : [
    'localhost:27017'
  ]
}
const serverHelper = function () {
  const jwt = require('jsonwebtoken')
  const crypto = require('crypto')
  const secretKey = process.env.SECRET_KEY || '112customer#$!@!'

  function decodeToken (token) {
    return jwt.decode(token)
  }

  function genToken (obj) {
    return jwt.sign(obj, secretKey, { expiresIn: '1d' })
  }

  function verifyToken (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretKey, (err, decoded) => {
        err ? reject(new Error(err)) : resolve(decoded)
      })
    })
  }

  function encryptPassword (password) {
    return crypto.createHash('sha256').update(password, 'binary').digest('base64')
  }

  const mapUserWithTarget = (users, mapTarget) => {
    if (mapTarget.constructor === Object) {
      mapTarget.user = users[0]
      return
    }
    const userMap = {}
    for (const user of users) {
      userMap[user.customerId] = user
    }
    for (const item of mapTarget) {
      item.user = userMap[item.createdBy || item.user]
    }
  }

  const mapGroupWithTarget = (groups, mapTarget) => {
    if (mapTarget.constructor === Object) {
      mapTarget.user = groups[0]
      return
    }
    const map = {}
    for (const group of groups) {
      map[group._id] = group
    }
    for (const item of mapTarget) {
      item.group = map[item.groupId]
    }
  }

  return { decodeToken, encryptPassword, verifyToken, genToken, mapUserWithTarget, mapGroupWithTarget }
}

const urlConfig = {
  feedUrl: process.env.FEED_URL || 'http://localhost:8003',
  uploadUrl: process.env.UPLOAD_URL || 'http://localhost:8004',
  customerUrl: process.env.CUSTOMER_URL || 'http://localhost:8005',
  userUrl: process.env.USER_URL || 'http://localhost:8006',
  groupUrl: process.env.GROUP_URL || 'http://localhost:8007',
  notificationUrl: process.env.NOTIFICATION_URL || 'http://localhost:8008',
  chatUrl: process.env.CHAT_URL || 'http://localhost:8009'
}

module.exports = { dbSettings, serverHelper: serverHelper(), serverSettings, httpCode, urlConfig }
