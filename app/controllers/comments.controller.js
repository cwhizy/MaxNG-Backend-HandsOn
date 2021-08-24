const comments = require("../models/comments.model.js");

// Create and Save a new Movie Comment
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Movie Comment
  const comment = new Movie_Comment({
    episode_id: req.body.episode_id,
    movie_title: req.body.movie_title,
    ip_address: req.body.ip_address,
    created_date: req.body.created_date,
    movie_comment: req.body.movie_comment
  });

  // Save movie comment in the database
  comments.create(comment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Movie Comment."
      });
    else res.send(data);
  });
};

// Retrieve all Movie Comments from the database.
exports.findAll = (req, res) => {
    comments.getAll(req.params.episode_id, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving movie comments."
          });
        else res.send(data);
      });
};

// Retrieve Movie Comments count from the database using movie episode_id.
exports.countComments = (req, res) => {
    comments.countComments(req.params.episode_id, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving movie comments count."
          });
        else res.send(data);
      });
};

// Find a single Movie Comment with a commentId
exports.findOne = (req, res) => {
    comments.findById(req.params.commentId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Comment with id ${req.params.commentId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Comment with id " + req.params.commentId
            });
          }
        } else res.send(data);
      });
};

// Update a Movie Comment identified by the commentId in the request
exports.update = (req, res) => {
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  comments.updateById(
    req.params.commentId,
    new Movie_Comment(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Comment with id ${req.params.commentId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Comment with id " + req.params.commentId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Movie Comment with the specified commentId in the request
exports.delete = (req, res) => {
    comments.remove(req.params.commentId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Comment with id ${req.params.commentId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Comment with id " + req.params.commentId
            });
          }
        } else res.send({ message: `Comment was deleted successfully!` });
      });
};

// Delete all Movie Comments from the database.
exports.deleteAll = (req, res) => {
    comments.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all movie comments."
          });
        else res.send({ message: `All Movie Comments were deleted successfully!` });
      });
};