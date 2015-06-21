/* global __dirname */

// Importación de modulos
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials'); // módulo de vistas parciales.
// Middleware para poder usar el atributo _method y poder usar los métodos de API Rest PUT y DELETE
var methodOverride = require('method-override');

// Middleware para usar sesiones de usuarios
var session = require('express-session');

var routes = require('./routes/index');

var app = express();

// Instalación de modulos
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // para que los formularios puedan tomar quiz[pregunta] correctamente.
app.use(cookieParser('Quiz')); //añadimos una semilla para el tema de las sesiones, que en las cookies use una semilla diferente para  codificarlas.  
app.use(session());

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Guardamos la ruta de petición previa, para poder volver a la misma página si es necesario
app.use(function (req, res, next) {
  // si la ruta no tiene un path de login o logout guardamos la ruta, para volver a la misma página depués de un login/out
  if (!req.path.match(/\/login|\/logout/)) {
    req.session.redir = req.path;
  }

  // hacer visible req.session en las vistas
  res.locals.session = req.session;
  next();
});

app.use('/', routes);



// añadimos ruta acerca de
app.get('/author', function (req, res) {
  res.render('author', { errors: [] });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      errors: []
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    errors: []
  });
});


module.exports = app;
