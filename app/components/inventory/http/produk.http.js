const {
  express: { app },
} = require('../../../state')
const produk = require('./service/product.controller')
// /admin/inventory => produk

module.exports = (basePath) => {
  app.get(basePath + '/produkAll/pagination', (req, res) => {
    return produk.findAll(req.query).then(
      (result) => res.send(result),
      (err) => res.status(403).send(err)
    )
  })
  app.get(basePath + '/produkOne/:id', (req, res) => {
    return produk.findOne(req.params.id).then(
      (result) => res.send(result),
      (err) => res.status(403).send(err)
    )
  })
  app.post(basePath + '/produkCreate', (req, res) => {
    return produk.addProduk(req.body).then(
      (result) => res.send(result),
      (err) => res.status(403).send(err)
    )
  })
  app.post(basePath + '/produkUpdate', (req, res) => {
    return produk.updateProduk(req.body).then(
      (result) => res.send(result),
      (err) => res.status(403).send(err)
    )
  })
  app.delete(basePath + '/produk/deleteOne/:id', (req, res) => {
    return produk.deleteOne(req.params.id).then(
      (result) => res.send(result),
      (err) => res.status(403).send(err)
    )
  })
  app.post(basePath + '/produk/deleteMany', (req, res) => {
    return produk.deleteMany(req.body.manyId).then(
      (result) => res.send(result),
      (err) => res.status(403).send(err)
    )
  })
}
