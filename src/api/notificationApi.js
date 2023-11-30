module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { notificationController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.get(`${basePath}/notifications`, notificationController.getNotification)
  app.get(`${basePath}/notifications/:id`, notificationController.getNotificationById)
}
