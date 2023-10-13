module.exports = (container) => {
  const testController = require('./testController')(container)
  return { testController }
}
