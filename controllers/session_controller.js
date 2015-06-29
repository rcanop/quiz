// GET /Login
exports.new = function (req, res) {
  var errors = req.session.errors || {};
  req.session.errors = {};

  res.render('sessions/new', { errors: errors });
};

// POST /login
exports.create = function (req, res) {
  var login = req.body.login;
  var clave = req.body.clave;
  
  var userController = require('./user_controller.js');

  userController.autenticar(login, clave, function (error, user) {
    if (error) {
      req.session.errors = [{ "message": '' + error }];
      res.redirect("/login");
      return;
    }
    var d = new Date();
    req.session.user = { id: user.id, username: user.username, hora: d.getTime() / 1000 };
    req.session.logado = 1
    if (req.session.redir)
      res.redirect(req.session.redir.toString()); // volvemos a la página de antes de login.
    else
      res.redirect('/');

  });
};

// DELETE /logout
exports.destroy = function (req, res) {
  delete req.session.user;
  
  req.session.logado = 0;
  if (req.session.redir) {
    res.redirect(req.session.redir.toString()); // volvemos a la página de antes de login.

  } else {
    res.redirect('/');

  }

};

exports.destroyAutomatico = function (req, res) {
  delete req.session.user;
  req.session.logado = 2;
  //if (req.session.redir) {
  //  res.redirect(req.session.redir.toString()); // volvemos a la página de antes de login.

  //} else {
  //  res.redirect('/');

  //}

};

exports.loginRequired = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};