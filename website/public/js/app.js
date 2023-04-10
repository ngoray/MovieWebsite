// var movie_url=
// "https://api.mlab.com/api/1/databases/jobs/collections/movies?apiKey=V0HsJe9lC8Q7naTJK7kS3ZfKnLJdrbQg&s={%27availability%27:1}"

var movie_url ="/movies";

var movie_array=[];

var category="Now Showing";

//var remote_comment ="https://api.mlab.com/api/1/databases/jobs/collections/comments";
//API key needed by cloud DB API
//var remote_api_key="?apiKey=V0HsJe9lC8Q7naTJK7kS3ZfKnLJdrbQg&s={'datePosted':-1}";
//Set comment variable to either remote_comment or local_comment

var comment_url="/comments";
var comment_array = [];

var popcornBWImage="images/popcorn_bw.png";
var popcornImage="images/popcorn.png";

var currentIndex=0;
var rating=0;

function showAbout() {


    document.getElementById("nowMenu").classList.remove("active");
    document.getElementById("comingMenu").classList.remove("active");
    document.getElementById("aboutMenu").classList.add("active");

    var messageModal = new Modal(document.getElementById("messageModal"));
    messageModal.show();

}

function showNow() {
    
    
        document.getElementById("aboutMenu").classList.remove("active");
        document.getElementById("comingMenu").classList.remove("active");
        document.getElementById("nowMenu").classList.add("active");
        category="Now Showing"
        displayMovies(category);
    
    
    }

    function showComing() {
        
        
            document.getElementById("aboutMenu").classList.remove("active");
            document.getElementById("nowMenu").classList.remove("active");
            document.getElementById("comingMenu").classList.add("active");
            category="Coming Soon"
            displayMovies(category);
        
        }