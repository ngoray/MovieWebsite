"use strict"
var db = require('../dbconnection');
class MoviesDB {

    getAllMovies(callback) {
        var sql = "SELECT * FROM movie_review.movie";

        return db.query(sql, callback);
    }
}
module.exports = MoviesDB;