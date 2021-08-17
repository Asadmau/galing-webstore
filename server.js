const express = require('express')
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require('cors')
const morgan = require('morgan')

const app = express()

// var corsOptions = {
//   origin: "http://localhost:8081"
// };
app.use(morgan())

app.use(cors())

// parse requests of content-type - application/json
app.use(express.json()) /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: false })
) /* bodyParser.urlencoded() is deprecated */

const { sequelize } = require('./app/models')
let mode = 'dev'
if (mode === 'dev') {
  sequelize.sync({ alter: true })
} else {
  sequelize.sync()
}
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
require('./app/routes/index')(app)
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to bezkoder application.' })
})

// require("./app/routes/turorial.routes")(app);
// require('./app/routes/satuan.routes')(app);
// require('./app/routes/kategori.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
