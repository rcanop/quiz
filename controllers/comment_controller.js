var models = require('../models/models.js');

exports.new = function (req, res) {
  res.render('comments/new.ejs' , { quizid: req.params.quizId, errors: [] });

};

exports.create = function (req, res) {
  var comment = models.Comment.build(
    {
      comentario: req.body.comment.comentario, 
      QuizId: req.params.quizId
    });


  comment
  .validate()
  .then(
    function (err) {
      if (err) {
        res.render('comments/new.ejs', { quizid: req.params.quizId, errors: err.errors });
      } else {
        comment
        .save()
        .then(function () {
          res.redirect('/quizes/' + req.params.quizId);
        });
      }
    })
  .catch(function(error) { next(error); });
};

exports.load = function (req, res, next, commentId) {
  models.Comment.findById(commentId)
  .then(
    function (comment) {
      if (comment) {
        req.comment = comment;
        next();
      } else {
        next(new Error("No existe el id de comentario: " + commentId));
      }
    })
  .catch(function (error) { next(error); }); 
};

exports.publish = function (req, res) {
  req.comment.publicado = true;
  req.comment
  .save({ fields: ["publicado"] })
  .then(function () {
    res.redirect("/quizes/" + req.comment.QuizId);
  })
  .catch(function (error) { next(error) });
};