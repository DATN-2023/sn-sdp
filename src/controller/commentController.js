module.exports = (container) => {
  const logger = container.resolve('logger')
  const { httpCode, serverHelper } = container.resolve('config')
  const { commentHelper, customerHelper } = container.resolve('helper')

  const getComment = async (req, res) => {
    try {
      const { statusCode, data, msg } = await commentHelper.getComment(req.query)
      if (statusCode !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg })
      }
      const { data: comments } = data
      const userIds = comments.map(comment => comment.createdBy.toString())
      const {data: users, statusCode: sc, msg: m} = await customerHelper.getListUserByIdsSDP({ids: userIds})
      if (sc !== httpCode.SUCCESS) {
        return res.status(statusCode).json({ msg: m })
      }
      serverHelper.mapUserWithTarget(users, comments)
      return res.status(httpCode.SUCCESS).json(data)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR' })
    }
  }

  const getCommentById = async (req, res) => {
    try {
      const { id } = req.params
      const { statusCode, data, msg } = await commentHelper.getCommentById(id)
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
    getComment,
    getCommentById
  }
}
