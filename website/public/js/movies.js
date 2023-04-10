// console.log("hi")

var remote_comment ="https://api.mlab.com/api/1/databases/jobs/collections/comments";
//API key needed by cloud DB API
var remote_api_key="?apiKey=V0HsJe9lC8Q7naTJK7kS3ZfKnLJdrbQg&s={'datePosted':-1}";
//Set comment variable to either remote_comment or local_comment

var comment_url=remote_comment + remote_api_key;
var comment_array = [];

//This function is to call the movies api and get all the movies
//that is showing in Shaw Theatres for Showing Now and Coming Soon
function getMovieData() {


    var request = new XMLHttpRequest();
    request.open('GET', movie_url, true);


    //This function will be called when data returns from the web api
    request.onload = function () {
        //get all the movies records into our movie array
        movie_array = JSON.parse(request.responseText);


        //call the function so as to display all movies tiles for "Now Showing"
        displayMovies(category);
        fetchComment();
    };
    //This command starts the calling of the movies web api
    request.send();
}

//This function is to display the movies tiles
//that filters based on "Now Showing" or "Coming Soon"
function displayMovies(category) {
    var table = document.getElementById("moviesTable");
    var movieCount = 0;
    var message = "";

    table.innerHTML = "";
    totalMovies = movie_array.length;

    for (var count = 0; count < totalMovies; count++) {
        if (movie_array[count].availability === category) {
            var thumbnail = 'products/' + movie_array[count].thumb;
            var title = movie_array[count].title;

            var cell = '<div class="col-md-3" style="float: none; margin: 0 auto;">                                                                                                                                                                                                   \
                            <div class="flip-container" >                                                                                                                                                                                       \
                                <div class="flipper">                                                                                                                                                                                           \
                                    <div class="front">                                                                                                                                                                                         \
                                        <a id="movies" class="movies" href="#" data-toggle="modal" data-target="#movieModal" item=' + count + '>                                                                                                \
                                            <img class="img-fluid img-thumbnail" src="' + thumbnail +'" />                                                                                                                                       \
                                        </a>                                                                                                                                                                                                    \
                                    </div>                                                                                                                                                                                                      \
                                    <div class="back">                                                                                                                                                                                          \
                                        <div class="bg-dark mystyle text-center py-3" >                                                                                                                                                         \
                                            <span>' + title + '('+movie_array[count].genre+')</span><br>                                                                                                                                                                      \
                                            <button href="#" data-toggle="modal" data-target="#movieModal" item="' + count + '" type="button" class="comments btn btn-primary btn-sm" onClick="showMovieDetails(this)" >See More</button>       \
                                            <button href="#" data-toggle="modal" data-target="#commentModal" item="' + count + '" type="button" class="comments btn btn-primary btn-sm" onClick="showMovieComments(this)" >Comments</button>    \
                                        </div>                                                                                                                                                                                                  \
                                    </div>                                                                                                                                                                                                      \
                                </div>                                                                                                                                                                                                          \
                            </div>                                                                                                                                                                                                              \
                        </div>';

            table.insertAdjacentHTML('beforeend', cell);
            movieCount++;
        }
    }

    message = movieCount + " Movies " + category;
    document.getElementById("summary").textContent = message;
    document.getElementById("parent").textContent = "";
}

function showMovieDetails(element)
{
    var item = element.getAttribute("item");
    // console.log("movie_array[item].title");
    document.getElementById("movieTitle").innerHTML=movie_array[item].title;
    document.getElementById("moviePoster").src='products/' + movie_array[item].poster;
    document.getElementById("genre").innerHTML="<strong>Genre:</strong>"+movie_array[item].genre;
    document.getElementById("director").innerHTML="<strong>Story:</strong>"+movie_array[item].story;
    document.getElementById("release").innerHTML="<strong>Cast:</strong>"+movie_array[item].cast;
    document.getElementById("release").innerHTML="<strong>Advice:</strong>"+movie_array[item].advice;

    document.getElementById("trailer1").src=movie_array[item].video1;
    document.getElementById("trailer2").src=movie_array[item].video2;

    document.getElementById("buy").href=movie_array[item].buy;

    var movieModal = new Modal(document.getElementById("movieModal"));
    movieModal.show();
}