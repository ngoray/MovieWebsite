"use strict"

const commentController = require('../controllers/commentController');



function routeComments(app) {
    app.route('/comments')
    .get(commentController.getAllComments)
    .post(commentController.addComment);

    app.route('/comments/:id')
    .put(commentController.updateComment)
    .delete(commentController.deleteComment)
}

module.exports = { routeComments };