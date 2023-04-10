"use strict"
var db = require('../dbconnection');  //references of dbconnection
class CommentsDB {

    getAllComments(callback) {
        var sql = "Select * FROM movie_review.comment";

        return db.query(sql, callback);
    }

    addComment(comment, callback) {
        var sql = "INSERT INTO comment (movieId, movie, review, username, rating, datePosted) VALUES (?, ?, ?, ?, ?, ?)";

        db.query(sql, [comment.getMovieId(), comment.getMovie().trim(), comment.getReview(), comment.getUsername(), comment.getRating(), comment.getDatePosted()], callback);
    }

    updateComment(comment, callback) {
        var sql = "UPDATE comment SET review = ?, username = ?, rating = ?, datePosted = ? WHERE _id = ?";

        return db.query(sql, [comment.getReview(), comment.getUsername(), comment.getRating(), comment.getDatePosted(), comment.getId()], callback);
    }


    //************deleteComment **********************//
    deleteComment(id, callback) {
        var sql = "DELETE FROM comment WHERE _id = ?";

        return db.query(sql, id, callback);
    }


}
module.exports = CommentsDB;