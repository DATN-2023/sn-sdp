module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { commentController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.get(`${basePath}/comments`, commentController.getComment)
  app.get(`${basePath}/comments/:id`, commentController.getCommentById)
}
