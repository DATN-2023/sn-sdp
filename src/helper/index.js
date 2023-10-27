module.exports = container => {
  const feedHelper = require('./feedHelper')(container)
  const commentHelper = require('./commentHelper')(container)
  const reactionHelper = require('./reactionHelper')(container)
  const uploadHelper = require('./uploadHelper')(container)
  const userHelper = require('./userHelper')(container)
  return { feedHelper, commentHelper, reactionHelper, uploadHelper, userHelper }
}
