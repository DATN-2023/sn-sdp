module.exports = (container) => {
  const {
    serverHelper,
    httpCode
  } = container.resolve('config')
  const logger = container.resolve('logger')
  const verifyToken = async (req, res, next) => {
    const token = req.headers['x-access-token'] || req.body.token || ''
    if (!token) {
      console.log('UNAUTHORIZED 66')
      return res.status(httpCode.UNAUTHORIZED).json({})
    }
    if (token === TOKEN_SSR) {
      req.userCache = {}
      return next()
    }
    const decode = serverHelper.decodeToken(token)
    if (!decode) {
      console.log('UNAUTHORIZED 75')
      return res.status(httpCode.UNAUTHORIZED).json({})
    }
    const { exp } = decode
    if (Date.now() >= exp * 1000) {
      console.log('TOKEN_EXPIRED 80', decode)
      return res.status(httpCode.TOKEN_EXPIRED).json({})
    }
    const { statusCode, data: user } = await userHelper.getUserDetail(token)
    if (statusCode !== httpCode.SUCCESS) {
      console.log('TOKEN_EXPIRED 85', decode)
      return res.status(httpCode.TOKEN_EXPIRED).json({})
    }
    req.userCache = user
    req.userToken = decode
    // todo: check xem user co bi block hay gi k con kick ra
    return next()
  }
  return { verifyToken }
}
