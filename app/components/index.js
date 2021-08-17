const { endpoint } = require('../state')
module.exports = () => {
  require('./inventory/models')
  require('./inventory/http').admin(endpoint.inventory)
  require('./inventory/http').public()
}
