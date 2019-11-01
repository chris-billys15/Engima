var apiRequest1 = fetch('http://localhost/tugas-besar-1-2019/api/movie/read.php').then(function(response){ 
    return response.json()
});
var apiRequest2 = fetch('http://localhost/tugas-besar-1-2019/api/review/read.php').then(function(response){
    return response.json()
});

//do API call and process the data on the go
Promise.all([apiRequest1,apiRequest2]).then(function(values){
    var movie_data = values[0]['records'];
    var review_data = values[1]['records'];

    movie_data.forEach(element => {

        var title = element['nama_movie']
        var poster = element['poster']
        var movie_id = element['movie_id']
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
        userScore.appendChild(document.createTextNode(mean_review_score))

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

