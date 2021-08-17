const { DataTypes } = require('sequelize')
const { sequelize } = require('../config')

module.exports = sequelize.define(
  'satuan',
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
)
