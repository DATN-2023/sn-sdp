module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { userController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.get(`${basePath}/users`, userController.getUser)
  app.get(`${basePath}/users/:id`, userController.getUserById)
  app.get(`${basePath}/friends`, userController.getFriend)
  app.get(`${basePath}/friends/:id`, userController.getFriendById)
}
