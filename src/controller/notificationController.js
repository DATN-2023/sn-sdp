module.exports = (container) => {
  const logger = container.resolve('logger')
  const { httpCode, serverHelper } = container.resolve('config')
  const { notificationHelper, customerHelper } = container.resolve('helper')

  const getNotification = async (req, res) => {
    try {
      const { statusCode, data, msg } = await notificationHelper.getNotification(req.query)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg })
      }
      const { data: notifications } = data
      const userIds = notifications.map(notification => notification.user.toString())
      const {data: users, statusCode: sc, msg: m} = await customerHelper.getListUserByIdsSDP({ids: userIds})
      if (sc !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg: m })
      }
      serverHelper.mapUserWithTarget(users, notifications)
      return res.status(httpCode.SUCCESS).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const getNotificationById = async (req, res) => {
    try {
      const { id } = req.params
      const { statusCode, data, msg } = await notificationHelper.getNotificationById(id)
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
    getNotification,
    getNotificationById
  }
}
