var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// añadimos las rutas GET de pregunta y respuesta. RUTAS SIEMPRE ABSOLUTAS
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

// añadimos ruta acerca de
router.get('/author', function (req, res) {
  res.render('author');
});

module.exports = router;
