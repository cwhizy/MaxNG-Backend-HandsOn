const sql = require("./db.js");

// constructor
const Movie_Comment = function(comment) {
  this.episode_id = comment.episode_id;
  this.movie_title = comment.movie_title;
  this.ip_address = comment.ip_address;
  this.created_date = comment.created_date;
  this.movie_comment = comment.movie_comment;
};

Movie_Comment.create = (newComment, result) => {
  sql.query("INSERT INTO movie_comments SET ?", newComment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created movie comment: ", { id: res.insertId, ...newComment });
    result(null, { id: res.insertId, ...newComment });
  });
};

Movie_Comment.findById = (commentId, result) => {
  sql.query(`SELECT * FROM movie_comments WHERE id = ${commentId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found comment: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found comment with the id
    result({ kind: "not_found" }, null);
  });
};

Movie_Comment.countComments = (episode_id, result) => {
    sql.query(`SELECT count(*) AS Count FROM movie_comments WHERE episode_id = ${episode_id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("movie comments count: ", res);
      result(null, res);
    });
  };

Movie_Comment.getAll = (episode_id, result) => {
  sql.query(`SELECT * FROM movie_comments WHERE episode_id = ${episode_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("movie comments: ", res);
    result(null, res);
  });
};

Movie_Comment.updateById = (id, comment, result) => {
  sql.query(
    "UPDATE movie_comments SET movie_title = ?, ip_address = ?, created_date = ?, movie_comment = ? WHERE id = ?",
    [comment.movie_title, comment.ip_address, comment.created_date, comment.movie_comment, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found comment with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated movie_comment: ", { id: id, ...comment });
      result(null, { id: id, ...comment });
    }
  );
};

Movie_Comment.remove = (id, result) => {
  sql.query("DELETE FROM movie_comment WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found comment with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted movie_comments with id: ", id);
    result(null, res);
  });
};

Movie_Comment.removeAll = result => {
  sql.query("DELETE FROM movie_comments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} movie_comments`);
    result(null, res);
  });
};

module.exports = Movie_Comment;