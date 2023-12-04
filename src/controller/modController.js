module.exports = (container) => {
  const logger = container.resolve('logger')
  const { httpCode, serverHelper } = container.resolve('config')
  const { modHelper, userHelper } = container.resolve('helper')

  const getMod = async (req, res) => {
    try {
      const { statusCode, data, msg } = await modHelper.getMod(req.query)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg })
      }
      const { data: mods } = data
      const userIds = mods.map(mod => mod.user.toString())
      const {data: users, statusCode: sc, msg: m} = await userHelper.getUserByIds({ids: userIds})
      if (sc !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg: m })
      }
      serverHelper.mapUserWithTarget(users, mods)
      return res.status(httpCode.SUCCESS).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const getModById = async (req, res) => {
    try {
      const { id } = req.params
      const { statusCode, data, msg } = await modHelper.getModById(id)
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
    getMod,
    getModById
  }
}
