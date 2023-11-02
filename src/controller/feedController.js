module.exports = (container) => {
  const logger = container.resolve('logger')
  const { httpCode, serverHelper } = container.resolve('config')
  const { feedHelper, userHelper } = container.resolve('helper')

  const mapUserWithTarget = (users, mapTarget) => {
    if (mapTarget.constructor === Object) {
      mapTarget.user = users[0]
      return
    }
    const userMap = {}
    for (const user of users) {
      userMap[user._id] = user
    }
    for (const item of mapTarget) {
      item.user = userMap[item.createdBy]
    }
  }

  const getFeed = async (req, res) => {
    try {
      const { statusCode, data, msg } = await feedHelper.getFeed(req.query)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg })
      }
      const { data: feeds } = data
      const userIds = feeds.map(feed => feed.createdBy)
      const {data: users, statusCode: sc, msg: m} = await userHelper.getListUserByIdsSDP({ids: userIds})
      if (sc !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg: m })
      }
      mapUserWithTarget(users, feeds)
      return res.status(httpCode.SUCCESS).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const getFeedById = async (req, res) => {
    try {
      const { id } = req.params
      const { statusCode, data, msg } = await feedHelper.getFeedById(id)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg })
      }
      const userId = data.createdBy
      const {data: users, statusCode: sc, msg: m} = await userHelper.getListUserByIdsSDP({ids: userId})
      if (sc !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg: m })
      }
      mapUserWithTarget(users, data)
      return res.status(httpCode.SUCCESS).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  return {
    getFeed,
    getFeedById
  }
}
