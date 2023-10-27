module.exports = (container) => {
  const { urlConfig: { uploadUrl }, httpCode } = container.resolve('config')
  const logger = container.resolve('logger')
  const accessToken = process.env.INTERNAL_TOKEN || '123'
  const axios = require('axios')

  const getPresignedUrl = async (q) => {
    try {
      const options = {
        headers: { 'x-access-token': accessToken },
        url: `${uploadUrl}/presignedUrl`,
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

  return {
    getPresignedUrl
  }
}
