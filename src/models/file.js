export default (sequelize, DataTypes) => {
  const File = sequelize.define(
    'File',
    {
      orig_name: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      encoding: { type: DataTypes.STRING, allowNull: false },
      mimetype: { type: DataTypes.STRING, allowNull: false },
      size: { type: DataTypes.FLOAT, allowNull: false },
      buffer: { type: DataTypes.ARRAY(DataTypes.FLOAT), allowNull: false },
      path: { type: DataTypes.STRING, allowNull: false },
    },
    {
      underscored: true,
      classMethods: {
        associate(models) {
          File.hasOne(models.User, { onDelete: 'cascade' });
        },
      },
    }
  );
  return File;
};
