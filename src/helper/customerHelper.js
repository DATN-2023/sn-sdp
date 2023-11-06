module.exports = (container) => {
  const { urlConfig: { customerUrl }, httpCode } = container.resolve('config')
  const logger = container.resolve('logger')
  const accessToken = process.env.BLOCK_TOKEN || '123'
  const axios = require('axios')

  const getListUserByIdsSDP = async (q) => {
    try {
      const options = {
        headers: { 'x-access-token': accessToken },
        url: `${customerUrl}/sdp/users`,
        json: true,
        params: q,
        method: 'GET'
      }
      const { data } = await axios(options)
      return { statusCode: httpCode.SUCCESS, data }
    } catch (e) {
      logger.e(e)
      return { statusCode: httpCode.BAD_REQUEST, msg: '' }
    }
  }

  const getUserByIdSDP = async (id) => {
    try {
      const options = {
        headers: { 'x-access-token': accessToken },
        url: `${customerUrl}/sdp/users/${id}`,
        json: true,
        method: 'GET'
      }
      const { data } = await axios(options)
      return { statusCode: httpCode.SUCCESS, data }
    } catch (e) {
      logger.e(e)
      return { statusCode: httpCode.BAD_REQUEST, msg: '' }
    }
  }

  return {
    getListUserByIdsSDP,
    getUserByIdSDP
  }
}
