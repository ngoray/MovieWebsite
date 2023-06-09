"use strict"

const express = require('express');
const routeMovies=require('./routes/routeMovies');
const routeComments = require('./routes/routeComments');
const bodyParser = require('body-parser');


var app = express();
var host = "127.0.0.1";
var port = 8080;
var home_file = "/index.html";

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routeMovies.routeMovies(app);
routeComments.routeComments(app);

function gotoIndex(f, request, respond) {
    respond.sendFile(__dirname + f);
}

app.get(home_file, gotoIndex);

// Starts the Web Server
var server = app.listen(port, host, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
});