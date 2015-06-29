var models = require('../models/models.js');

// Autoload - factoriza el código si la ruta contiene :quizId
exports.load = function (req, res, next, quizId) {
  models.Quiz.find({
    where: { id: Number(quizId) },
    include: [{ model: models.Comment }] // Añadimos todos los comentarios de la pregunta.
  }) 
  .then(
    function (quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else {
        next(new Error("No existe quizId = " + quizId));
      }
    }).catch(function (error) { next(error); });
};
// GET /quizes
exports.index = function (req, res, next) {
  var search = null
  , query = {};
  
  // Obtener los datos de la consulta.  
  if (req.query.search !== undefined) {
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
    res.render('quizes/index.ejs', { quizes: quizes, search: search, errors: [] });
  }).catch(function (error) { next(error); });
};

// GET /quizes/show
exports.show = function (req, res) {
  models.Quiz.findById(req.params.quizId).then(function (quiz) {
    res.render('quizes/show', { quiz: req.quiz, errors: [] });
  }).catch(function (error) { next(error); });
};

// GET /quizes/answer
exports.answer = function (req, res) {
  models.Quiz.findById(req.params.quizId).then(function (quiz) {
    var obj = {
      quiz: quiz,
      respuesta: (req.query.respuesta === req.quiz.respuesta),
      errors: []
    };
    res.render('quizes/answer', obj);
  }).catch(function (error) { next(error); });
};


// GET quizes/new
exports.new = function (req, res) {
  var quiz = models.Quiz.build(
    { pregunta: '', respuesta: '' }
  );
  res.render('quizes/new', { quiz: quiz, errors: [] });

};

//POST quizes
exports.create = function (req, res) {
  var quiz = models.Quiz.build(req.body.quiz);
  
  // Validar y guardar
  quiz
  .validate()
  .then(
    function (err) {
      if (err) {
        res.render('quizes/new', { quiz: quiz, errors: err.errors }); // mandamos la matriz de erróres
      } else {
        quiz
        .save({ fields: ["pregunta", "respuesta", "tema"] })
        .then(function () { res.redirect('/quizes'); });
      }
    });
};

exports.edit = function (req, res) {
  var quiz = models.Quiz.findById(req.params.quizId)
  .then(function (quiz) {
    var obj = {
      quiz: quiz,
      pregunta: quiz.pregunta,
      respuesta: quiz.respuesta,
      errors: []
    };
    res.render('quizes/edit', obj);
  }).catch(function (error) { next(error); });
}

//PUT quizes/:quizId
exports.update = function (req, res) {
  
  req.quiz.pregunta  = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema      = req.body.quiz.tema;
  // Validar y guardar 
  req.quiz
  .validate()
  .then(
    function (err) {
      if (err) {
        res.render('quizes/edit', { quiz: req.quiz, errors: err.errors }); // mandamos la matriz de erróres
      } else {
        req.quiz
        .save({ fields: ["pregunta", "respuesta", "tema"] })
        .then(function () { res.redirect('/quizes'); });
      }
    });
};

exports.delete = function (req, res) {
  req.quiz.destroy()
  .then(function () {
    res.redirect('/quizes');
  }).catch(function (error) {
    next(error);
  });
};
