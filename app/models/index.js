const { sequelize } = require('../config')
const produk = require('./produk.model')
const variasi = require('./variasi.model')
const file = require('./file.model')
const kategori = require('./kategori.model')
const satuan = require('./satuan.model')

produk.hasMany(variasi)
variasi.belongsTo(produk, {
  foreignKey: 'produkId',
})
file.hasOne(produk)
produk.belongsTo(file, {
  foreignKey: 'fileId',
})

kategori.hasMany(produk)
produk.belongsTo(kategori, {
  foreignKey: 'kategoriId',
})

satuan.hasMany(variasi)
variasi.belongsTo(satuan, {
  foreignKey: 'satuanId',
})

module.exports = {
  produk,
  variasi,
  file,
  satuan,
  kategori,
  sequelize,
}
