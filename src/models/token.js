export default (sequelize, DataTypes) => {
  const Token = sequelize.define(
    'Token',
    {
      token: { type: DataTypes.STRING, allowNull: false },
      userId: {
        type: DataTypes.INTEGER,
        references: { Model: 'User' },
        allowNull: false,
      },
      type: { type: DataTypes.STRING, enum: 'refresh', allowNull: false },
      expires: { type: DataTypes.DATE, allowNull: false },
      blacklisted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      underscored: true,
      classMethods: {
        associate(models) {
          Token.hasOne(models.User, { onDelete: 'cascade' });
        },
      },
    }
  );
  return Token;
};
