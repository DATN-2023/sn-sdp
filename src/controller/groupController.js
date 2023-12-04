module.exports = (container) => {
  const logger = container.resolve('logger')
  const { httpCode, serverHelper } = container.resolve('config')
  const { groupHelper, userHelper } = container.resolve('helper')

  const getGroup = async (req, res) => {
    try {
      const { statusCode, data, msg } = await groupHelper.getGroup(req.query)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg })
      }
      const { data: groups } = data
      if (!groups.length) return res.status(httpCode.SUCCESS).json(data)
      const userIds = groups.map(group => group.createdBy.toString())
      const {data: users, statusCode: sc, msg: m} = await userHelper.getUserByIds({ids: userIds})
      if (sc !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg: m })
      }
      serverHelper.mapUserWithTarget(users, groups)
      return res.status(httpCode.SUCCESS).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const getJoiningGroups = async (req, res) => {
    try {
      const { statusCode, data: groups, msg } = await groupHelper.getJoiningGroups(req.query)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg })
      }
      if (!groups.length) return res.status(httpCode.SUCCESS).json(groups)
      const userIds = groups.map(group => group.createdBy.toString())
      const {data: users, statusCode: sc, msg: m} = await userHelper.getUserByIds({ids: userIds})
      if (sc !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg: m })
      }
      serverHelper.mapUserWithTarget(users, groups)
      return res.status(httpCode.SUCCESS).json(groups)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const getGroupById = async (req, res) => {
    try {
      const { id } = req.params
      const { statusCode, data, msg } = await groupHelper.getGroupById(id)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg })
      }
      return res.status(httpCode.SUCCESS).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  return {
    getGroup,
    getGroupById,
    getJoiningGroups
  }
}
