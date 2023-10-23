module.exports = container => {
  const feedHelper = require('./feedHelper')(container)
  return { feedHelper }
}
