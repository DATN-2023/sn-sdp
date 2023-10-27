module.exports = (container) => {
  const feedController = require('./feedController')(container)
  const commentController = require('./commentController')(container)
  const reactionController = require('./reactionController')(container)
  const uploadController = require('./uploadController')(container)
  return { feedController, commentController, reactionController, uploadController }
}
