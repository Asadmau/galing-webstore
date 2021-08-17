const db = require('../models');
const Kategori = db.kategori;
// const Op = db.Sequelize.Op;
//get all data
exports.findAll = async (req, res)=>{
     try {
        const kategori = await Kategori.findAll({});
        if (kategori.length !== 0) {
            res.json({
                'status': 'OK',
                'message': '',
                'data': kategori
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
//create data
exports.create = async (req, res) => {
    try {
        const {
            name,
        } = req.body;
        const kategori = await Kategori.create({
            name
        });
        // kategori.save();
        // console.log(kategori.dataValues);
        if (kategori) {
            res.json({
                'status': 'OK',
                'message': 'data berhasil di tambahkan',
                'data' : kategori,
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

//menampilkan data berdasarkan ID
exports.findOne = async (req, res) => {
    const id = req.params.id;
    Kategori.findByPk(id).then(data => {
        res.send(data);
    }).catch(error => {
        res.status(500).send({
            message: 'Error data ID=' + id
        });
    })
}

// update data 
exports.updateData = async (req, res) => {
    try {
        const kategori = await Kategori.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        if (kategori) {
            res.json({
                'status': 'OK',
                'message': 'Berhasil di edit',
                'data': kategori
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
            'data': error.message
         });
    } 
}

// delete data
module.exports.delete = async (req, res) => {
    try {
        await Kategori.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "kategori Deleted Success"
        });
    } catch (err) {
        console.log(err);
    }
}