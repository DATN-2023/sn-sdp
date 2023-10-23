const axios = require('axios')
module.exports = (container) => {
  const { urlConfig: { feedUrl }, httpCode } = container.resolve('config')
  const logger = container.resolve('logger')
  const accessToken = process.env.INTERNAL_TOKEN || '123'
  const axios = require('axios')

  const getFeed = async (q) => {
    try {
      const options = {
        headers: { 'x-access-token': accessToken },
        url: `${feedUrl}/sdp/feeds`,
        json: true,
        params: q,
        method: 'GET'
      }
      const { data } = await axios(options)
      return { statusCode: httpCode.SUCCESS, data }
    } catch (e) {
      const { name, statusCode, error } = e
      if (name === 'StatusCodeError') {
        return { data: error, statusCode, msg: (error || {}).msg || '' }
      }
      return { statusCode: httpCode.BAD_REQUEST, msg: '' }
    }
  }

  const getFeedById = async (id) => {
    try {
      const options = {
        headers: { 'x-access-token': accessToken },
        url: `${feedUrl}/sdp/feeds/${id}`,
        json: true,
        method: 'GET'
      }
      const { data } = await axios(options)
      return { statusCode: httpCode.SUCCESS, data }
    } catch (e) {
      const { name, statusCode, error } = e
      if (name === 'StatusCodeError') {
        return { data: error, statusCode, msg: (error || {}).msg || '' }
      }
      return { statusCode: httpCode.BAD_REQUEST, msg: '' }
    }
  }

  return {
    getFeed,
    getFeedById
  }
}
