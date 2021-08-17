let baseApi = '/admin'
module.exports = {
  config: require('./db.config'),
  sequelize: require('./sequelize'),
  moment: require('moment'),
  express: require('./config'),
  port: process.env.PORT || 8080,
  endpoint: {
    inventory: baseApi + '/inventory',
  },
}
