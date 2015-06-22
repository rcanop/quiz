module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Comment', 
  {
    comentario: {
      type: DataTypes.TEXT,
      validate: {
        // http://sequelize.readthedocs.org/en/latest/docs/models-definition/#validations
        notEmpty: { msg: " Falta el comentario." },
        len: {
          args: [0, 1000], msg: "No puede tener una longitud superior a 1000 caractéres."
        }
      }
    },
    publicado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

};
