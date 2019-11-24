function setCookie(cookieName, cookieValue){
	
	var d = new Date();
	d.setTime(d.getTime() + (3600*1000)); //set cookie to expire in one hour
	var expires = "expires="+d.toUTCString();
	document.cookie = cookieName + "=" + cookieValue + ";" + expires + "path=/";
}

function getCookie(cookieName){

	var name = cookieName + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');

	for(var i = 0; i < ca.length; i++){
		var c = ca[i];
		while(c.charAt(0) == " "){
			c = c.substring(1);
		}
		if(c.indexOf(name) === 0){
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function deleteCookie(cookieName){
	document.cookie = cookieName+'=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

function checkCookie(cookieName){
	return getCookie(cookieName) !== "";
}

var xhr = new XMLHttpRequest();

function searchMovie(){
	//console.log("entered here")
    movie_query = document.getElementsByClassName('search-box')[0].value;
	setCookie("movie_query", movie_query)
	window.location.replace("movie_search.html")
}

function searchResult(){
    var movie_query = getCookie("movie_query")
    var movieQueryURL = "http://localhost/engimav2/api/movie/search.php?movie=" + movie_query;

    xhr.open("GET", movieQueryURL, false);
    xhr.send(); // send request to API endpoint
	
	var result = JSON.parse(xhr.responseText)
    return result["records"]
}

function newSearchResult(page_num){
    var movie_query = getCookie("movie_query")
    var movieQueryURL = "https://api.themoviedb.org/3/search/movie?api_key=724dae92117735bb7f07f3f8a95157a0&language=en-US&query="+movie_query+"&page="+page_num.toString()+"&include_adult=false";

    xhr.open("GET", movieQueryURL, false);
    xhr.send(); // send request to API endpoint
	
    var result = JSON.parse(xhr.responseText)
    return result
}

function reviewResult(){
	var movie_query = getCookie("movie_query")
    var movieQueryURL = "http://localhost/engimav2/api/review/read.php"	;

    xhr.open("GET", movieQueryURL, false);
    xhr.send(); // send request to API endpoint
    
    return JSON.parse(xhr.responseText)["records"]
}

function goToMovieDetail(movie_id){
    setCookie("movie_id_cookie", movie_id)
    window.location.replace("movie_detail.html")
}

function renderMovie(movie_result, review_data){

    var movie_query = getCookie("movie_query")
    var movie_render = movie_result['results']
    
    var myNode1 = document.getElementsByClassName("movie-count")[0];
    while (myNode1.firstChild) {
        myNode1.removeChild(myNode1.firstChild);
    }

    var myNode2 = document.getElementsByClassName("movie-query")[0];
    while (myNode2.firstChild) {
        myNode2.removeChild(myNode2.firstChild);
    }

    var myNode = document.getElementsByClassName("content-list-container")[0];
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    document.getElementsByClassName('movie-query')[0].appendChild(document.createTextNode('Showing search result for keyword "' + movie_query + '"'))
    document.getElementsByClassName('movie-count')[0].appendChild(document.createTextNode(movie_result['total_results'] + " results available"))

    if(movie_render){
        movie_render.forEach(element => {
            
            var title = element['original_title']
            if (element['poster_path'] != null){
                var poster = 'http://image.tmdb.org/t/p/original' + element['poster_path']
            }
            else{
                return;
            }
            var movie_id = element['id']
            var mean_review_score = 0
            var n_movie = 0
            var greetingText = 'Hi, ' + getCookie('active_user')
        

            review_data.forEach(element => {
                if(element['movie_id'] == movie_id){
                    n_movie++;
                    mean_review_score += parseFloat(element['skor'])
                }
            }); 
        
            mean_review_score = mean_review_score/n_movie

            

            var node = document.createElement('div')
            node.className = 'content-container'
            
            var detailNode = document.createElement('div')
            detailNode.className = "text-detail"

            var imgNode = document.createElement('img')
            imgNode.src = poster
            imgNode.className = 'content-img'
            imgNode.addEventListener("click", function(){goToMovieDetail(movie_id)})

            var titleNode = document.createElement('div')
            var titleText = document.createTextNode(title)
            titleNode.className = 'movie-title'
            titleNode.appendChild(titleText)

            var score = document.createElement('div')
            score.className = 'content-score'

            var starImg = document.createElement('i')
            starImg.className = 'fas fa-star'

            var userScore = document.createElement('div')
            userScore.className = 'user-score'
            userScore.appendChild(document.createTextNode(element['vote_average']))

            var synopsisNode = document.createElement('div')
            synopsisNode.className = 'movie-synopsis'
            synopsisNode.appendChild(document.createTextNode(element["overview"]))

            var viewDetailNode = document.createElement('div')
            viewDetailNode.className = 'view-detail'
            viewDetailNode.appendChild(document.createTextNode("View Details"))
            viewDetailNode.addEventListener("click", function(){goToMovieDetail(movie_id)})

            score.appendChild(starImg)
            score.appendChild(userScore)

            detailNode.appendChild(titleNode)
            detailNode.appendChild(score)
            detailNode.appendChild(synopsisNode)
            detailNode.appendChild(viewDetailNode)

            node.appendChild(imgNode)
            node.appendChild(detailNode)

            document.getElementsByClassName('content-list-container')[0].appendChild(node)
        });
    }
}



var path = window.location.pathname;
var page = path.split("/").pop();
var review_data = reviewResult();
const movie_counts = 0;
const movie_per_page = 5
var movie_query = getCookie("movie_query")

function renderPageButton(page_num, isPrev, isNext){
    var navigationNode = document.getElementsByClassName('navigation')[0]
    var pageButton = document.createElement('div')
    pageButton.className = 'page-button'
    
    if(isPrev == 1){
        pageButton.appendChild(document.createTextNode('Prev'))
    }
    else if(isNext == 1){
        pageButton.appendChild(document.createTextNode('Next'))
    }
    else{
        pageButton.appendChild(document.createTextNode(page_num))
    }
    
    pageButton.addEventListener("click", function(){renderPage(page_num)})

    navigationNode.appendChild(pageButton)
}

function renderPage(page_num){
    var prev_page
    var next_page
    var movie_result = newSearchResult(page_num)

    var navigationNode = document.getElementsByClassName('navigation')[0]
    while (navigationNode.firstChild) {
        navigationNode.removeChild(navigationNode.firstChild);
    }

    if(page_num == 1){
        prev_page = 1
        next_page = page_num + 1
    }
    else if(page_num == movie_result['total_pages']){
        prev_page = page_num - 1
        next_page = 1
    }
    else{
        prev_page = page_num - 1
        next_page = page_num + 1
    }

    setCookie('current_page', page_num)
    renderMovie(movie_result, review_data)

    renderPageButton(prev_page, 1, 0)

    for(i = page_num; i <= page_num+5; i++){
        const page = i
        renderPageButton(page, 0, 0)
    }

    renderPageButton(next_page, 0, 1)
}


if(page == "movie_search.html"){
    
    renderPage(1)
    
}


// function split_movies(movie_data){
//     var movie_splitted = []
//     var chunk = []

//     j = 0
//     for(i = 0, len = movie_data.length; i < len; i++){
//         chunk.push(movie_data[i])
//         if(j == movie_per_page - 1){
//             movie_splitted.push(chunk)
//             j = 0
//             chunk = []
//         }
//         if((j != movie_per_page - 1) && (i == len-1)){
//             movie_splitted.push(chunk)
//             j = 0
//         }
//         j++
//     }

//     return movie_splitted
// }

//main program
// if (movie_counts > 0){
//     var movie_splitted = split_movies(movie_data)
// }
// else{
//     var movie_splitted = []
// }
