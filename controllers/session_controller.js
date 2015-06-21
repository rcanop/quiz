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

    req.session.user = { id: user.id, username: user.username };
    res.redirect(req.session.redir.toString()); // volvemos a la página de antes de login.
  });
};

// DELETE /logout
exports.destroy = function (req, res) {
  delete req.session.user;
  res.redirect(req.session.redir.toString()); // volvemos a la página de antes de login.
};

exports.loginRequired = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};