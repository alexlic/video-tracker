module.exports = (sequelize, DataType) => {
  const Videos = sequelize.define('Videos', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataType.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    url: {
      type: DataType.STRING,
      allowNull: false,
      defaultValue: false
    }
  })
  return Videos
}
