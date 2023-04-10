"use strict"
const Comment = require('../models/Comment');
const CommentsDB = require('../models/CommentsDB');
var commentsDB = new CommentsDB();
function getAllComments(request, respond) {

    commentsDB
        .getAllComments(function (error, result) {

            if (error) {
                respond.json(error);
            } else {

                respond.json(result);
            }

        });
}

function addComment(request, respond) {

    var now = new Date();
    var comment = new Comment(null, request.body.movieId, request.body.movie, request.body.review, request.body.username, request.body.rating, now.toString());

    commentsDB.addComment(comment, function (error, result) {


        if (error) {
            respond.json(error);
        } else {
            respond.json(result);
        }

    });

}

function updateComment(request, respond) {
    var now = new Date();
    var comment = new Comment(parseInt(request.params.id), request.body.movieId, request.body.movie, request.body.review, request.body.username, request.body.rating, now.toString());

    commentsDB.updateComment(comment, function (error, result) {

        if (error) {
            respond.json(error);
        } else {
            respond.json(result);
        }

    });
}

//**********Comment Controller - DeleteComment *******//

function deleteComment(request, respond) {
    commentsDB.deleteComment(request.params.id, function (error, result) {

        if (error) {
            respond.json(error);
        } else {
            respond.json(result);
        }
    });
}

module.exports = { getAllComments, addComment, updateComment, deleteComment };