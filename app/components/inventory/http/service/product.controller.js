const { produk, variasi } = require('../../models')
module.exports = class {
  static displayProduk() {
    return new Promise((resolve, reject) => {
      produk
        .findAll({
          limit: 2,
          include: [{ model: variasi, limit: 1, order: [['id', 'ASC']] }],
          group: ['produk.id'],
          order: [['createdAt', 'DESC']],
        })
        .then(
          (item) => {
            resolve({
              status: 'ok',
              data: item,
            })
          },
          (error) => {
            reject({
              status: 'failed',
              error: new Error(error),
            })
          }
        )
    })
  }
  static findAll(query) {
    const { page = 1, perPage = 20 } = query
    let limit = Number(perPage)
    let currentPage = Number(page)
    let offset = perPage * (currentPage - 1)
    return new Promise((resolve, reject) => {
      produk
        .findAndCountAll({
          offset,
          limit,
          include: [{ model: variasi }],
          group: ['produk.id'],
        })
        .then(
          (item) => {
            const { rows, count } = item
            resolve({
              status: 'ok',
              allData: count.length,
              currentPage,
              totalPage: Math.ceil(count.length / perPage),
              data: rows,
            })
          },
          (error) => {
            reject({
              status: 'failed',
              error: error,
            })
          }
        )
    })
  }
  static findOne(id) {
    return new Promise((resolve, reject) => {
      produk
        .findOne({
          include: [{ model: variasi }],
          where: {
            id,
          },
        })
        .then(
          (item) => {
            resolve({
              status: 'ok',
              data: item,
            })
          },
          (error) => {
            reject({
              status: 'failed',
              error: new Error(error),
            })
          }
        )
    })
  }

  static addProduk(body) {
    return new Promise((resolve, reject) => {
      produk.create({ name: body.name }).then(
        (isProduk) => {
          let dataVariasi = body.variasi.map((item) => {
            let variasiItem = item
            variasiItem.produkId = isProduk.id
            return variasiItem
          })
          variasi.bulkCreate(dataVariasi).then(
            (isVariasi) => {
              resolve({
                status: 'ok',
                data: isProduk,
                variasi: isVariasi,
              })
            },
            (err) => {
              reject({
                status: 'failed',
                error: err,
              })
            }
          )
        },
        (err) => {
          reject({
            status: 'failed',
            error: err,
          })
        }
      )
    })
  }
  static updateProduk(body) {
    return produk
      .update({ name: body.name }, { where: { id: body.produkId } })
      .then(() => {
        return Promise.all(
          body.variasi.map((it) => {
            let id = it.categoryId
            delete it.categoryId
            return variasi
              .update(it, { where: { id } })
              .then((idMatch) => idMatch)
          })
        )
      })
      .then(() => {
        return this.findOne(body.produkId)
      })
      .catch((err) => {
        return {
          status: 'failed',
          error: new Error(err),
        }
      })
  }

  static deleteOne(id) {
    return new Promise((resolve, reject) => {
      produk.destroy({ where: { id } }).then(
        (isDelete) => {
          variasi.destroy({ where: { produkId: id } }).then(
            () => {
              resolve({
                status: 'ok',
                message: isDelete + ' produk removed',
              })
            },
            (err) => {
              reject({
                status: 'failed',
                error: new Error(err),
              })
            }
          )
        },
        (err) => {
          reject({
            status: 'failed',
            error: new Error(err),
          })
        }
      )
    })
  }
  static deleteMany(manyId) {
    return new Promise((resolve, reject) => {
      produk.destroy({ where: { id: manyId } }).then(
        (isDelete) => {
          variasi.destroy({ where: { produkId: manyId } }).then(
            (isVariasiDelete) => {
              resolve({
                status: 'ok',
                message: isDelete + ' produk removed',
              })
            },
            (err) => {
              reject({
                status: 'failed',
                error: new Error(err),
              })
            }
          )
        },
        (err) => {
          reject({
            status: 'failed',
            error: new Error(err),
          })
        }
      )
    })
  }
  // static findAllThen(query) {
  //     const { page = 1, perPage = 20 } = query
  //     let limit = Number(perPage)
  //     let currentPage = Number(page)
  //     let offset = perPage * (currentPage - 1)
  //     return produk.findAndCountAll({
  //             offset,
  //             limit,
  //             include:[{model: variasi, as:'variasi'}]
  //         }).then((item) => {
  //             const { rows, count } = item
  //             return {
  //                 status: 'ok',
  //                 allData: count,
  //                 currentPage,
  //                 totalPage: Math.ceil(count / perPage),
  //                 data: rows
  //             }
  //         }, err => {
  //             return {
  //                 status: 'failed',
  //                 error : new Error(err)
  //             }
  //         })
  // }
  // static async findAllAsyncronus(query) {
  //     try {
  //         const { page = 1, perPage = 20 } = query
  //         let limit = Number(perPage)
  //         let currentPage = Number(page)
  //         let offset = perPage * (currentPage - 1)
  //         const { rows, count } = await  produk.findAndCountAll({
  //                 offset,
  //                 limit,
  //                 include:[{model: variasi, as:'variasi'}]
  //             })
  //         return {
  //                 status: 'ok',
  //                 allData: count,
  //                 currentPage,
  //                 totalPage: Math.ceil(count / perPage),
  //                 data: rows
  //             }
  //     } catch (error) {
  //         return {
  //                 status: 'failed',
  //                 error : new Error(err)
  //             }
  //     }
  // }
}
