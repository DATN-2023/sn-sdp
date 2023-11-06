module.exports = (app, container) => {
  require('./feedApi')(app, container)
  require('./commentApi')(app, container)
  require('./reactionApi')(app, container)
  require('./uploadApi')(app, container)
  require('./userApi')(app, container)
}
