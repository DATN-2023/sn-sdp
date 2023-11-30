module.exports = container => {
  const feedHelper = require('./feedHelper')(container)
  const commentHelper = require('./commentHelper')(container)
  const reactionHelper = require('./reactionHelper')(container)
  const uploadHelper = require('./uploadHelper')(container)
  const customerHelper = require('./customerHelper')(container)
  const userHelper = require('./userHelper')(container)
  const groupHelper = require('./groupHelper')(container)
  const userGroupHelper = require('./userGroupHelper')(container)
  const modHelper = require('./modHelper')(container)
  const notificationHelper = require('./notificationHelper')(container)
  return {
    feedHelper,
    commentHelper,
    reactionHelper,
    uploadHelper,
    customerHelper,
    userHelper,
    groupHelper,
    userGroupHelper,
    modHelper,
    notificationHelper
  }
}
