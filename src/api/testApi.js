module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { testController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.get(`${basePath}/test`, testController.get)
}
