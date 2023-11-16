module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { groupController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.get(`${basePath}/groups`, groupController.getGroup)
  app.get(`${basePath}/groups/:id`, groupController.getGroupById)
}
