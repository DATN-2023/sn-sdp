module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { modController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.get(`${basePath}/mods`, modController.getMod)
  app.get(`${basePath}/mods/:id`, modController.getModById)
}
