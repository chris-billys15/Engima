var apiRequest1 = fetch('http://localhost/engimav2/api/movie/read.php').then(function(response){ 
    return response.json()
});
var apiRequest2 = fetch('http://localhost/engimav2/api/review/read.php').then(function(response){
    return response.json()
});
now_date = (new Date()).toISOString().split("T")[0]
prev_date = new Date()
prev_date.setDate(prev_date.getDate() - 7)
prev_date = prev_date.toISOString().split("T")[0]
movie_date_link = "https://api.themoviedb.org/3/discover/movie?api_key=724dae92117735bb7f07f3f8a95157a0&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&release_date.gte="+prev_date+"&release_date.lte="+now_date
console.log(movie_date_link)
var apiRequest3 = fetch(movie_date_link).then(function(response){
    return response.json()
});

//do API call and process the data on the go
Promise.all([apiRequest1,apiRequest2,apiRequest3]).then(function(values){
    var movie_data = values[0]['records'];
    var review_data = values[1]['records'];
    var new_movie_data = values[2]['results'];

    var image_link = 'http://image.tmdb.org/t/p/original'
    console.log(new_movie_data)

    new_movie_data.forEach(element => {

        var title = element['original_title']
        if (element['poster_path'] == null){
            return;
        }
        else{
            var poster = image_link + element['poster_path']
        }
        var movie_id = element['id']
        var mean_review_score = 0
        var n_movie = 0
        var greetingText = 'Hi yo, ' + getCookie('active_user')
        
        review_data.forEach(element => {
            if(element['movie_id'] == movie_id){
                n_movie++;
                mean_review_score += parseFloat(element['skor'])
            }
        }); 
    
        mean_review_score = mean_review_score/n_movie

        var node = document.createElement('div')
        node.className = 'content-container'

        var imgAnchor = document.createElement('a')
        imgAnchor.href = 'movie_detail.html'
        imgAnchor.class = 'img-anchor'
        imgAnchor.addEventListener("click", function(){makeMovieCookie(movie_id)})

        var imgNode = document.createElement('img')
        imgNode.src = poster
        imgNode.className = '25%'

        var titleNode = document.createElement('p')
        var titleText = document.createTextNode(title)
        titleNode.appendChild(titleText)

        var score = document.createElement('div')
        score.className = 'content-score'

        var starImg = document.createElement('i')
        starImg.className = 'fas fa-star'

        var userScore = document.createElement('div')
        userScore.className = 'user-score'
        userScore.appendChild(document.createTextNode(element['vote_average']))

        score.appendChild(starImg)
        score.appendChild(userScore)

        imgAnchor.appendChild(imgNode)

        node.appendChild(imgAnchor)
        node.appendChild(titleNode)
        node.appendChild(score)

        document.getElementsByClassName('content-list-container')[0].appendChild(node)
        document.getElementsByClassName('user-greetings')[0].innerHTML = greetingText
    });

});

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

function makeMovieCookie(movie_id){
    setCookie("movie_id_cookie", movie_id)
}

