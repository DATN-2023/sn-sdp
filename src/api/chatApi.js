module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { chatController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.get(`${basePath}/messages`, chatController.getMessage)
  app.get(`${basePath}/messages/:id`, chatController.getMessageById)
}
