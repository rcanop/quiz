var path = require('path');

// Cargar modelo ORM
var Sequelize = require('sequelize');

// Usar BD SQLite
var db = new Sequelize(null, null, null, 
  { dialect: 'sqlite', storage: 'quiz.sqlite' }
);
// importamos la definición de la tabla Quiz en quiz.js
var Quiz = db.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; // exportamos la variable Quiz para poder se usado el modelo


// Inicialización de la base de datos
// ----------------------------------
// db.sync().success() crea e inicaliza tabla de preguntas (quiz) en la DB. 
// Esta inicialización es la antigua ahora se usa promise, db.sync().then() 
db.sync().then(function () {
  Quiz.count().then(function (count) {
    if (count === 0) { // Si no hay registros de agrega uno
      Quiz.create({
        pregunta: 'Capital de italia',
        respuesta: 'Roma'
      }).then(function () { // cuando se cree el registro sale mensaje en consola.
        console.log('Base de datos inicializada');
      });
    };
  })
});