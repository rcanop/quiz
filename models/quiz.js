module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Quiz', 
  {
    pregunta: {
      type: DataTypes.STRING,
      validate: {
        // http://sequelize.readthedocs.org/en/latest/docs/models-definition/#validations
        notEmpty: { msg: " - Pregunta es obligatorio." },
        len: { args:[6, 255], msg: "Pregunta debe tener un mínimo de 6 caractéres y un máximo de 255." }
      }
    },
    respuesta: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: " - Respuesta es obligatoria." },
        len: { args: [0, 255], msg: "Respuesta debe tener un máximo de 255 caracteres." }
      }
    },
    tema: {
      type: DataTypes.STRING(32),
      validate: {
        notEmpty: { msg: "El campo tema debe de estar relleno." }
      }
    }
  });

}
