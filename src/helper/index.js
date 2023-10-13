module.exports = container => {
  const testHelper = require('./testHelper')(container)
  return { testHelper }
}
