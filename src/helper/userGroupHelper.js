const axios = require('axios')
module.exports = (container) => {
  const { urlConfig: { groupUrl }, httpCode } = container.resolve('config')
  const logger = container.resolve('logger')
  const accessToken = process.env.INTERNAL_TOKEN || '123'
  const axios = require('axios')

  const getUserGroup = async (q) => {
    try {
      const options = {
        headers: { 'x-access-token': accessToken },
        url: `${groupUrl}/sdp/userGroups`,
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

  const getUserGroupById = async (id) => {
    try {
      const options = {
        headers: { 'x-access-token': accessToken },
        url: `${groupUrl}/sdp/userGroups/${id}`,
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
    getUserGroup,
    getUserGroupById
  }
}
