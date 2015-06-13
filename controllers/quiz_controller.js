var models = require('../models/models.js');

// Autoload - factoriza el código si la ruta contiene :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.findById(quizId).then(
    function (quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else {
        next(new Error("No existe quizId = " + quizId));
      }
    }).catch(function(error) { next(error); });
}; 
// GET /quizes
exports.index = function(req, res) {
  models.Quiz.findAll().then(function (quizes) {
    res.render('quizes/index.ejs', { quizes: quizes });
  }).catch(function (error) { next(error); });
};
// GET /quizes/show
exports.show = function (req, res) {
  models.Quiz.findById(req.params.quizId).then(function (quiz) {
    res.render('quizes/show', { quiz: req.quiz });
  }).catch(function (error) { next(error); });
};

// GET /quizes/answer
exports.answer = function (req, res) {
  models.Quiz.findById(req.params.quizId).then(function (quiz) {
    var obj = {
      quiz: quiz,
      respuesta: (req.query.respuesta === req.quiz.respuesta)
    };
    res.render('quizes/answer', obj);
  }).catch(function (error) { next(error); });
};
