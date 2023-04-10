"use strict"

const movieController = require('../controllers/movieController');



function routeMovies(app) {
    app.route('/movies')
    .get(movieController.getAllMovies);
    app.route('/comments').get(function(request, response){
        response.send('You made it to the home page')
    });
}

module.exports = { routeMovies };