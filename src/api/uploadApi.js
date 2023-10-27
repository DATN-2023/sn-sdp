module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { uploadController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.get(`${basePath}/presignedUrl`, uploadController.getPresignedUrl)
}
