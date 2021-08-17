const {
  express: { app },
} = require('../../../state')

// admin produk

module.exports = () => {
  app.get('/produkList', (req, res) => {
    return produk.displayProduk().then(
      (result) => res.send(result),
      (err) => res.status(403).send(err)
    )
  })
}
