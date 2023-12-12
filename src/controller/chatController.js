module.exports = (container) => {
  const logger = container.resolve('logger')
  const { httpCode, serverHelper } = container.resolve('config')
  const { chatHelper, userHelper } = container.resolve('helper')

  const getMessage = async (req, res) => {
    try {
      const { statusCode, data, msg } = await chatHelper.getMessage(req.query)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg })
      }
      // const { data: messages } = data
      // const userIds = messages.map(message => message.createdBy.toString())
      // const {data: users, statusCode: sc, msg: m} = await userHelper.getUserByIds({ids: userIds})
      // if (sc !== httpCode.SUCCESS) {
      //   return res.status(statusCode).json({ msg: m })
      // }
      // serverHelper.mapUserWithTarget(users, messages)
      return res.status(httpCode.SUCCESS).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const getMessageById = async (req, res) => {
    try {
      const { id } = req.params
      const { statusCode, data, msg } = await chatHelper.getMessageById(id)
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
    getMessage,
    getMessageById
  }
}
