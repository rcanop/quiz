var path = require('path');

// Configurar la base datos.
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);

var DB_name = (url[6] || null);
var DB_user     = (url[2] || null);
var DB_pwd      = (url[3] || null);
var DB_protocol = (url[1] || null);
var DB_dialect  = (url[1] || null);
var DB_port     = (url[5] || null);
var DB_host     = (url[4] || null);

var storage = process.env.DATABASE_STORAGE;

// Cargar modelo ORM
var Sequelize = require('sequelize');

// Usar BD SQLite
//var db = new Sequelize(null, null, null, 
//  { dialect: 'sqlite', storage: 'quiz.sqlite' }
//);
var db = new Sequelize(DB_name, DB_user, DB_pwd, 
 {
  dialect: DB_dialect,
  protocol: DB_protocol,
  port: DB_port,
  host: DB_host,
  storage: storage,   // sólo SQLite (.env)
  omitNull: true      // sólo Postgres
});


// importamos la definición de la tabla Quiz en quiz.js
var Quiz = db.import(path.join(__dirname, 'quiz'));
var Comment = db.import(path.join(__dirname, 'comment'));

// establecer la relación entre Quiz y Comment
Comment.belongsTo(Quiz); // Un comentario pertenece a una pregunta
Quiz.hasMany(Comment, {
  'constraints': true,
  'onUpdate': 'cascade',
  'onDelete': 'cascade',
  'hooks': true
});  // Una pregunta puede tener varios comentarios.


exports.Quiz = Quiz; // exportamos la variable Quiz para poder se usado el modelo
exports.Comment = Comment;
exports.sql = db;

// Inicialización de la base de datos
// ----------------------------------
// db.sync().success() crea e inicaliza tabla de preguntas (quiz) en la DB. 
// Esta inicialización es la antigua ahora se usa promise, db.sync().then() 
db.sync().then(function () {
  Quiz.count().then(function (count) {
    if (count === 0) { // Si no hay registros de agrega uno
      Quiz.bulkCreate([
        {
          pregunta: 'Capital de Italia',
          respuesta: 'Roma',
          tema: 'humanidades'
        },
        {
          pregunta: 'Capital de Portugal',
          respuesta: 'Lisboa',
          tema: 'humanidades'

        }]
        ).then(function () { // cuando se cree el registro sale mensaje en consola.
        console.log('Base de datos inicializada');
      });
    };
  })
});