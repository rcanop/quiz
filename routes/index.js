var express = require('express');
var router = express.Router();

var quizController    = require('../controllers/quiz_controller.js');
var commentController = require('../controllers/comment_controller.js');
var sessionController = require('../controllers/session_controller.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});
// Autoload de comandos con :quizId
router.param('quizId', quizController.load); // si existe el parámetro :quizId dentro de la ruta ejecuta quizController.load

// añadimos las rutas GET de pregunta y respuesta. RUTAS SIEMPRE ABSOLUTAS
router.get('/quizes'                     , quizController.index); // Muestra todas las preguntas
router.get('/quizes/:quizId(\\d+)'       , quizController.show); // Muestra una pregunta r
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new'                 , sessionController.loginRequired, quizController.new);  // Si se
router.post('/quizes'                    , sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit'  , sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)'       , sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)'    , sessionController.loginRequired, quizController.delete);

// Autoload comentarios
router.param('commentId', commentController.load);

// añadimos rutas para crear comentarios.
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments'   , commentController.create);
router.put('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish'
  , sessionController.loginRequired, commentController.publish); // actualizar campo Publicar con PUT c0mo debe de ser.

// rutas de sesión
router.get('/login', sessionController.new); // login
router.post('/login', sessionController.create); // crear la sesión
router.delete('/logout', sessionController.destroy);//logout con DELETE

module.exports = router;
