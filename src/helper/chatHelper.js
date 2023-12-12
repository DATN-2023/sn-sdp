const axios = require('axios')
module.exports = (container) => {
  const { urlConfig: { chatUrl }, httpCode } = container.resolve('config')
  const logger = container.resolve('logger')
  const accessToken = process.env.INTERNAL_TOKEN || '123'
  const axios = require('axios')

  const getMessage = async (q) => {
    try {
      const options = {
        headers: { 'x-access-token': accessToken },
        url: `${chatUrl}/sdp/messages`,
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

  const getMessageById = async (id) => {
    try {
      const options = {
        headers: { 'x-access-token': accessToken },
        url: `${chatUrl}/sdp/messages/${id}`,
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
    getMessage,
    getMessageById
  }
}
