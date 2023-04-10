function fetchComment() {

    comment_url="/comments";
    var request = new XMLHttpRequest();
    request.open('GET', comment_url, true);


    //This function will be called when data returns from the web api
    request.onload = function () {
     
        //get all the movies records into our movie array
        comment_array = JSON.parse(request.responseText);
        console.log("ok");
        console.log(comment_array);


        //call the function so as to display all movies tiles for "Now Showing"
        // displayMovies(category);
    };
    //This command starts the calling of the movies web api
    request.send();
}

//This function is to display all the comments of that movie
//whenever the user click on the "comment" button
function showMovieComments(element) {
    document.getElementById("emptyComment").innerHTML = "No review yet. Create one now";
    var item = element.getAttribute("item");
    currentIndex = item;
    var commentModal = new Modal(document.getElementById("commentModal"));

    document.getElementById("review").textContent = "Review for " + movie_array[item].title;
    document.getElementById("commentBody").textContent = "";

    for (var i = 0; i < comment_array.length; i++) {
        if (comment_array[i].movie.trim() === movie_array[item].title.trim()) {
            document.getElementById("emptyComment").innerHTML = "";
            selectedMovieId = movie_array[item]._id;
            star = "";
            var html = '<div class="text-center" style="width:100%;"> \
    <div class="card"> \
    <div class="card-body"> \
    <p class="card-text" id="rating' + i + '">' + comment_array[i].review + "</p> \
    <small>by " + comment_array[i].username + " @ " + comment_array[i].datePosted + "</small> \
    </div> \
    </div> \
    </div>";
            document.getElementById("commentBody").insertAdjacentHTML('beforeend', html);

            var star = "";
            for (var j = 0; j < comment_array[i].rating; j++) {
                star += "<img src='images/popcorn.png' style='width:50px' />";
            }
            star += "<img src='images/delete.png' class='edit' item='" + i + "' onClick='deleteComment(this)' />";
            star += "<img src='images/edit.png' class='edit' item='" + i + "' onClick='editComment(this)' />";
            document.getElementById("rating" + i).insertAdjacentHTML('beforebegin', star + "<br/>");
        }
    }
    commentModal.show();
}

/********** function to show modal when user clicks on new comment button ****************/


function newComment() {
    var commentModal = new Modal(document.getElementById("commentModal"));
    var newCommentModal = new Modal(document.getElementById("newCommentModal"));
    commentModal.hide();
    newCommentModal.show();
    rating = 0;
    document.getElementById("userComments").value = "";
    document.getElementById("nickname").value = "";
    resetPop('pop');

}

function resetPop(classname) 
{
    var pop = document.getElementsByClassName("pop");
    for (let p of pop) 
    {
        p.setAttribute("src", popcornBWImage);
    }
}

/********** Function that will be invoked when user submit the review for the movie  ****************/
function addComment() {
    console.log(currentIndex);
    var newCommentModal = new Modal(document.getElementById("newCommentModal"));
    var messageModal = new Modal(document.getElementById("messageModal"));
    var comment = new Object();

    newCommentModal.hide();
    comment.movieId = movie_array[currentIndex]._id;
    comment.movie = movie_array[currentIndex].title;
    comment.username = document.getElementById("nickname").value;
    comment.review = document.getElementById("userComments").value;
    // comment.datePosted = new Date().toString();
    comment.rating = rating;

    var postComment = new XMLHttpRequest(); // new HttpRequest instance

    postComment.open("POST", comment_url, true); //For Local Comments DB


    postComment.setRequestHeader("Content-Type", "application/json");
    postComment.onload = function () {
        fetchComment();
    };
    postComment.send(JSON.stringify(comment));
}

/********** Function that will be invoked when user hovers the mouse over the popcorn images ****************/
function rateIt(element, classname) {
    var num = element.getAttribute("value");
    var pop = document.getElementsByClassName(classname);
    var classTarget = "." + classname;
    resetPop(classname);

    changePopcornImage(num, classTarget);
}
/********** Function correctly display the colored popcorn ****************/
function changePopcornImage(num, classTarget) {
    switch (eval(num)) {
        case 1:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            rating = 1;
            break;
        case 2:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            rating = 2;
            break;
        case 3:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", popcornImage);
            rating = 3;
            break;
        case 4:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", popcornImage);
            rating = 4;
            break;
        case 5:
            document.querySelector(classTarget + "[value='1']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='2']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='3']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='4']").setAttribute("src", popcornImage);
            document.querySelector(classTarget + "[value='5']").setAttribute("src", popcornImage);
            rating = 5;
            break;
    }
}

/*********delete function when user click on the delete comment button****************/
function deleteComment(element) {
    var response = confirm("Are you sure you want to delete this comment?");
    
    if (response == true) {
    var commentModal = new Modal(document.getElementById("commentModal"));
    var item = element.getAttribute("item");
    var delete_comment_url =remote_comment + "/" + comment_array[item]._id; //For Local Comments DB
    var eraseComment = new XMLHttpRequest();
    commentModal.hide();
    eraseComment.open("DELETE", delete_comment_url, true);
    eraseComment.onload = function () {
    fetchComment();
    var thankyouModal = new Modal(document.getElementById("thankyouModal"));
    thankyouModal.show();
    
    };
    eraseComment.send();
    }x
    }

    /********** Edit Comment  Function****************/
//this function is called when the user clicks on the pencil icon

function editComment(element) {
    var item = element.getAttribute("item");
    currentIndex = item;
    var commentModal = new Modal(document.getElementById("commentModal"));
    commentModal.hide();
    var editCommentModal = new Modal(document.getElementById("editCommentModal"));
    editCommentModal.show();
    document.getElementById("editnickname").value = comment_array[item].username;
    document.getElementById("edituserComments").value = comment_array[item].review;
    console.log(comment_array[item].rating);
    displayColorPopcorn('editpop', comment_array[item].rating);
    }
    /**********display the correct popcorn based on the selected comment ****************/
    //this function is display the correct number of colored popcorn
    //based on the movie rating that is given in the user comment
    function displayColorPopcorn(classname, num) {
    var pop = document.getElementsByClassName(classname);
    for (let p of pop)
    p.setAttribute("src", popcornBWImage);
    var classTarget = "." + classname;
    changePopcornImage(num, classTarget);
    }
    /*********update function when user click on update comment button****************/
    function updateComment() {
    var response = confirm("Are you sure you want to update this comment ?");
    
    if (response == true) {
    var commentModal = new Modal(document.getElementById("editCommentModal"));
    commentModal.hide();
    
    var edit_comment_url = remote_comment + "/" + comment_array[currentIndex]._id; //For Remote Comments DB. Here the id looks abit different as it is the Cloud implementation
    
    var updateComment = new XMLHttpRequest(); // new HttpRequest instance
    updateComment.open("PUT", edit_comment_url, true);
    updateComment.setRequestHeader("Content-Type", "application/json");
    comment_array[currentIndex].username = document.getElementById("editnickname").value;
    comment_array[currentIndex].review = document.getElementById("edituserComments").value;
    comment_array[currentIndex].rating = rating;
    updateComment.onload = function () {
    fetchComment();
    var thankyouModal = new Modal(document.getElementById("thankyouModal"));
    thankyouModal.show();
    
    };
    updateComment.send(JSON.stringify(comment_array[currentIndex]));
    }
    }