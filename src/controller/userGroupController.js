module.exports = (container) => {
  const logger = container.resolve('logger')
  const { httpCode, serverHelper } = container.resolve('config')
  const { userGroupHelper, customerHelper } = container.resolve('helper')

  const getUserGroup = async (req, res) => {
    try {
      const { statusCode, data, msg } = await userGroupHelper.getUserGroup(req.query)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg })
      }
      const { data: userGroups } = data
      const userIds = userGroups.map(userGroup => userGroup.createdBy.toString())
      const {data: users, statusCode: sc, msg: m} = await customerHelper.getListUserByIdsSDP({ids: userIds})
      if (sc !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg: m })
      }
      serverHelper.mapUserWithTarget(users, userGroups)
      return res.status(httpCode.SUCCESS).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const getUserGroupById = async (req, res) => {
    try {
      const { id } = req.params
      const { statusCode, data, msg } = await userGroupHelper.getUserGroupById(id)
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
    getUserGroup,
    getUserGroupById
  }
}
