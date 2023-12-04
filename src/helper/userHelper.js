const axios = require('axios')
module.exports = container => {
  const { urlConfig: { userUrl }, httpCode } = container.resolve('config')
  const logger = container.resolve('logger')
  const accessToken = process.env.INTERNAL_TOKEN || '123'
  const axios = require('axios')

  const getUser = async (q) => {
    try {
      const options = {
        headers: { 'x-access-token': accessToken },
        url: `${userUrl}/sdp/users`,
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
  const getUserByIds = async (q) => {
    try {
      const options = {
        headers: { 'x-access-token': accessToken },
        url: `${userUrl}/sdp/users/ids`,
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

  const getUserById = async (id, query) => {
    try {
      const options = {
        headers: { 'x-access-token': accessToken },
        url: `${userUrl}/sdp/users/${id}`,
        json: true,
        params: query,
        method: 'GET'
      }
      const { data } = await axios(options)
      return { statusCode: httpCode.SUCCESS, data }
    } catch (e) {
      logger.e(e)
      return { statusCode: httpCode.BAD_REQUEST, msg: '' }
    }
  }

  const getFriend = async (q) => {
    try {
      const options = {
        headers: { 'x-access-token': accessToken },
        url: `${userUrl}/sdp/friends`,
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

  const getFriendById = async (id) => {
    try {
      const options = {
        headers: { 'x-access-token': accessToken },
        url: `${userUrl}/sdp/friends/${id}`,
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
    getUser,
    getUserById,
    getFriend,
    getFriendById,
    getUserByIds
  }
}