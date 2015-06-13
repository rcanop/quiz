var models = require('../models/models.js');

// GET /quizes
exports.index = function(req, res) {
  models.Quiz.findAll().then(function (quizes) {
    res.render('quizes/index.ejs', { quizes: quizes });
  });
};
// GET /quizes/show
exports.show = function (req, res) {
  models.Quiz.findById(req.params.quizId).then(function (quiz) {
    console.log(req.params.quizId);
    console.log(quiz);
    res.render('quizes/show', { quiz: quiz });
  });
};

// GET /quizes/answer
exports.answer = function (req, res) {
  models.Quiz.findById(req.params.quizId).then(function (quiz) {
    if (req.query.respuesta === quiz.respuesta) {
      res.render('quizes/answer', {
        quiz: quiz, 
        respuesta: true
      });
    }
    else {
      res.render('quizes/answer', {
        quiz: quiz, 
        respuesta: false
      });
    }
  });
  
};