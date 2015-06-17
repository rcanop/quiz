var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});
// Autoload de comandos con :quizId
router.param('quizId', quizController.load); // si existe el parámetro :quizId dentro de la ruta ejecuta quizController.load

// añadimos las rutas GET de pregunta y respuesta. RUTAS SIEMPRE ABSOLUTAS
router.get('/quizes', quizController.index); // Muestra todas las preguntas
router.get('/quizes/:quizId(\\d+)', quizController.show); // Muestra una pregunta r
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);


// añadimos ruta acerca de
router.get('/author', function (req, res) {
  res.render('author', { errors: [] });
});

module.exports = router;
