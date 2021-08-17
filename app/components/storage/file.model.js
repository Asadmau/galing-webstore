const { DataTypes } = require('sequelize')
const { sequelize } = require('../config')

module.exports = sequelize.define(
  'file',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    contentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true }
)
