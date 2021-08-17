module.exports = {
  admin: function (basePath) {
    require('./produk.http')(basePath)
    require('./service/satuan')(basePath)
  },
  public: require('./frontend'),
}
