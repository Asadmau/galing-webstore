const { express, sequelize, port } = require('./app/state')
const componentInit = require('./app/components')

function init() {
  let mode = 'dev'
  if (mode === 'dev') {
    sequelize.sync({ force: false, alter: true })
  } else {
    sequelize.sync()
  }
  componentInit()

  express.app.listen(port, () => console.log('App runing in port ' + port))
}
init()
