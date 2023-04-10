"use strict"
const MoviesDB = require('../models/MoviesDB');
var moviesDB = new MoviesDB();
function getAllMovies(request, respond) {

    moviesDB.getAllMovies(function (error, result){

        if (error) {
            respond.json(error);
        } else {

            respond.json(result);
        }
    });
}
module.exports = { getAllMovies };