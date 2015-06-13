var models = require('../models/models.js');

// Autoload - factoriza el c�digo si la ruta contiene :quizId
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
exports.index = function (req, res, next) {
  var search = null
  , query = {};
  console.log("--------------" + req.query.search);
  // Obtener los datos de la consulta.  
  if (req.query.search  !== undefined) {
    search = req.query.search;
    
    if (search.trim().length > 0) {
      search = '%' + search.replace(/\s/g, '%') + '%';
      query = { where: ["pregunta LIKE ?", search], limit: null };
    
    } else {
      next(new Error("Introduzca un texto para buscar preguntas."));
    
    }
  }
  
  // Buscar las preguntas.
  models.Quiz.findAll(query).then(function (quizes) {
    res.render('quizes/index.ejs', { quizes: quizes, search: search });
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
