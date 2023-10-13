const { initDI } = require('./di')
const { name } = require('../package.json')
const config = require('./config')
const logger = require('./logger')
const middleware = require('./middleware')
const server = require('./server')
const controller = require('./controller')
const helper = require('./helper')

const EventEmitter = require('events').EventEmitter
const mediator = new EventEmitter()
logger.d(`${name} Service`)
mediator.once('di.ready', container => {
  container.registerValue('config', config)
  container.registerValue('middleware', middleware)
  container.registerValue('logger', logger)
  container.registerValue('mediator', mediator)
  container.registerValue('helper', helper(container))
  container.registerValue('controller', controller(container))
  container.registerValue('middleware', middleware(container))

  server.start(container).then(app => {
    logger.d('Server started at port ', app.address().port)
  })
})
initDI(mediator)
