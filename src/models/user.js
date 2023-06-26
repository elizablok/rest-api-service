import bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      underscored: true,
      classMethods: {
        associate(models) {
          User.hasMany(models.File, { onDelete: 'cascade' });
        },
        async isNameTaken(name) {
          return User.findOne({ where: { name } });
        },
      },
      instanceMethods: {
        async passwordMatches(inputPassword) {
          return bcrypt.compare(inputPassword, this.password);
        },
      },
      hooks: {
        async beforeCreate() {
          return bcrypt.hash(this.password, 8);
        },
      },
    }
  );
  return User;
};

