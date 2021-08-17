const db = require('../models');
const Satuan = db.satuan;
const Op = db.Sequelize.Op;
//get all data
exports.findAll = async (req, res)=>{
     try {
        const satuan = await Satuan.findAll({});
        if (satuan.length !== 0) {
            res.json({
                'status': 'OK',
                'message': '',
                'data': satuan
            })
        } else {
            res.json({
                'status': 'ERROR',
                'message': 'data kosong',
                'data': {}
            })
        }
    } catch (error) {
        res.json({
            'status': 'ERROR',
            'messages': error.message,
            'data': {}
        })
    }
}

//menampilkan data berdasarkan ID
exports.findOne = async (req, res) => {
    const id = req.params.id;
    Satuan.findByPk(id).then(data => {
        res.send(data);
    }).catch(error => {
        res.status(500).send({
            message: error+'Error data ID=' + id
        });
    })
}

// create data satuan
exports.create = async (req, res) => {
    try {
        const {
            name,
        } = req.body;
        const satuan = await Satuan.create({
            name
        });
        if (satuan) {
            res.json({
                'status': 'OK',
                'message': 'data berhasil di tambahkan',
                'data' : satuan,
             });
        } else {
            res.json({
                'message': 'Data Gagal di tambahkan',
                'data': {}
             });
        }
    } catch (error) {
        res.json({
            'status': 'ERROR',
            'message': error.kategori,
         });
    }
}
//update data
exports.updateData = async(req, res) => {
    try {
        const satuan = await Satuan.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        if (satuan) {
            res.json({
                'status': 'OK',
                'message': 'Berhasil Update',
                'data': satuan,
            });
        } else {
            res.json({
                'message': 'Data gagal di edit',
                'data': {}
            });
        }
    } catch(error) {
        res.json({
            'status': 'ERROR data tidak di temukan',
            'message': error.message,
         });
    }
}
// delete data
exports.delete = async (req, res) => {
    try {
        const satuan = await  Satuan.destroy({
            where: {
                id: req.params.id
            }
        });
        if (satuan) {
            res.json({
                'status': 'OK',
                'message': 'Berhasil Di hapus',
                'data': satuan
             });
        } else {
            res.json({
                'message': 'gagal di hapus / data tidak di temukan',
                'data': {}
             });
        }
    } catch (error) {
        res.json({
            'status': 'ERROR',
            'data': error.message,
         });
    }
}