module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { feedController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.get(`${basePath}/feeds`, feedController.getFeed)
  app.get(`${basePath}/feeds/:id`, feedController.getFeedById)
}
