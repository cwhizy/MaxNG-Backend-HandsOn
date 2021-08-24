module.exports = app => {
    const comments = require("../controllers/comments.controller.js");
  
    // Create a new Movie Comment
    app.post("/comments", comments.create);
  
    // Retrieve all Movie Comment
    app.get("/comments/movieComments/:episode_id", comments.findAll);

    // Retrieve Movie Comment count
    app.get("/comments/countComments/:episode_id", comments.countComments);
  
    // Retrieve a single movie comment with commentId
    app.get("/comments/:commentId", comments.findOne);
  
    // Update a Movie Comment with commentId
    app.put("/comments/:commentId", comments.update);
  
    // Delete a Movie Comment with commentId
    app.delete("/comments/:commentId", comments.delete);
  
    // Create a new Movie Comment
    app.delete("/comments", comments.deleteAll);
  };