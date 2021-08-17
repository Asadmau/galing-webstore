module.exports = (app) => {
  const router = require('express').Router()
  const satuan = require('../controllers/satuan.controller')
  const kategori = require('../controllers/kategori.controller')
  const url = require('../controllers/url.controller')
  const harga = require('../controllers/harga.controller')
  const produk = require('../controllers/product.controller')

  // satuan
  app.get('/satuan', satuan.findAll)
  app.get('/satuan/:id', satuan.findOne)
  app.post('/satuan/add', satuan.create)
  app.put('/satuan/edit/:id', satuan.updateData)
  app.delete('/satuan/:id', satuan.delete)

  //kategori
  app.get('/kategori', kategori.findAll)
  app.get('/kategori/:id', kategori.findOne)
  app.post('/kategori/add', kategori.create)
  app.put('/kategori/edit/:id', kategori.updateData)
  app.delete('/kategori/:id', kategori.delete)

  //url
  app.get('/url', url.findAll)
  app.get('/url/:id', url.findOne)
  app.post('/url/add', url.create)
  app.put('/url/edit/:id', url.update)
  app.delete('/url/:id', url.delete)

  //harga
  app.get('/harga', harga.findAll)

  app.get('/produkList', (req, res) => {
    return produk.displayProduk().then(
      (result) => res.send(result),
      (err) => res.status(403).send(err)
    )
  })
  app.get('/produkAll/pagination', (req, res) => {
    return produk.findAll(req.query).then(
      (result) => res.send(result),
      (err) => res.status(403).send(err)
    )
  })
  app.get('/produkOne/:id', (req, res) => {
    return produk.findOne(req.params.id).then(
      (result) => res.send(result),
      (err) => res.status(403).send(err)
    )
  })
  app.post('/produkCreate', (req, res) => {
    return produk.addProduk(req.body).then(
      (result) => res.send(result),
      (err) => res.status(403).send(err)
    )
  })
  app.post('/produkUpdate', (req, res) => {
    return produk.updateProduk(req.body).then(
      (result) => res.send(result),
      (err) => res.status(403).send(err)
    )
  })
  app.delete('/produk/deleteOne/:id', (req, res) => {
    return produk.deleteOne(req.params.id).then(
      (result) => res.send(result),
      (err) => res.status(403).send(err)
    )
  })
  app.post('/produk/deleteMany', (req, res) => {
    return produk.deleteMany(req.body.manyId).then(
      (result) => res.send(result),
      (err) => res.status(403).send(err)
    )
  })

  app.use(router)
}
