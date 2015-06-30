var models = require('../models/models.js');

exports.statistics = function (req, res) {
  var datos = {
    totalQuestions: 0,
    totalComments: 0,
    averageCommentsQuestions: 0,
    totalQuestionsWithOutComments: 0,
    totalQuestionsWithComments: 0
  };
  
  // Total preguntas
  models.Quiz.count().then(function (c) {
    datos.totalQuestions = c;

  });
  
  //Total comentarios
  models.Comment.count().then(function (c) {
    datos.totalComments = c;
  });
  
  
  // Pregunta con comentarios.
  // esto solo funciona con SQLite, no encuentro la manera de hacerlo en sequelize.
  // models.sql.query('SELECT COUNT(DISTINCT QuizId) cta FROM `Comments`', 
  // { type: models.sql.QueryTypes.SELECT })
  // .then(function (cur) {
  //   datos.totalQuestionsWithComments = cur[0].cta;
  // })
  // models.Comment.count({
  //   distinct: true,
  //   group: ["QuizId"]
  // }).then(function (c) {  
  // SOLUCION HACER UN SELECT QuizId,COUNT(*) FROM Comments GROUP BY QuizId
  models.Comment.findAll({
    attributes: ["QuizId", models.sql.fn('count', models.sql.col('QuizId'))],
    group:  ["QuizId"] 
    })
    .then(function (c) {
    datos.totalQuestionsWithComments = c.length;
    // Media de comentarios / pregunta
    datos.averageCommentsQuestions = datos.totalComments / datos.totalQuestions;
    // Pregunta sin comentarios.
    datos.totalQuestionsWithOutComments = datos.totalQuestions - datos.totalQuestionsWithComments;
    res.render('quizes/statistic', { datos: datos, errors: [] });
  
    });
};