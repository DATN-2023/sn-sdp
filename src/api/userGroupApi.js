module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { userGroupController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.get(`${basePath}/userGroups`, userGroupController.getUserGroup)
  app.get(`${basePath}/userGroups/:id`, userGroupController.getUserGroupById)
}
