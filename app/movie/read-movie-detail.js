
var movie_id = getCookie("movie_id_cookie")

var apiRequest1 = fetch('http://localhost/tugas-besar-1-2019/api/movie/read.php').then(function(response){ 
    return response.json()
});
var apiRequest2 = fetch('http://localhost/tugas-besar-1-2019/api/review/read.php').then(function(response){
    return response.json()
});
var apiRequest3 = fetch('http://localhost/tugas-besar-1-2019/api/schedule/read_movie.php?movie_id='+movie_id).then(function(response){
    return response.json()
});
var apiRequest4 = fetch('http://localhost/tugas-besar-1-2019/api/ticket/read.php').then(function(response){
    return response.json()
});

function isAvailable(hour, date){

    var available;
    if (hour < 10){
        var date_string = date+"T0"+hour+":00:00Z"
    }
    else{
        var date_string = date+"T"+hour+":00:00Z"
    }
    var date_schedule = new Date(date_string);
    var date_now = new Date();
    
    console.log(date_string)
    return date_schedule > date_now
}

Promise.all([apiRequest1,apiRequest2, apiRequest3, apiRequest4]).then(function(values){
    var movie_data = values[0]['records'];
    var review_data = values[1]['records'];
    var schedule_data = values[2]['records'];
    var ticket_data = values[3]['records'];

    //process review data
    var review_data_movie = []
    var mean_review_score = 0

    review_data.forEach(element => {
        if(element['movie_id'] == movie_id){
            review_data_movie.push(element)
            mean_review_score += parseFloat(element['skor'])
        }
    }); 


    mean_review_score = mean_review_score/review_data_movie.length

    if (review_data_movie.length > 0){
        review_data_movie.forEach(element => {
            
            var username = element["username"]  
            var scoreNumber = element["skor"]
            var content = element["content"]

            var originNode = document.createElement('div')
            originNode.className = 'review-content-middle'

            var node = document.createElement('div')
            node.className = 'review-content-detail'

            var userImg = document.createElement('i')
            userImg.className = 'far fa-user-circle fa-5x'

            var reviewer = document.createElement('div')
            reviewer.className = 'reviewer'
            reviewer.appendChild(document.createTextNode(username))

            var score = document.createElement('div')
            score.className = 'score'

            var starImg = document.createElement('i')
            starImg.className = 'fas fa-star'

            var userScore = document.createElement('div')
            userScore.className = 'user-score'
            userScore.appendChild(document.createTextNode(scoreNumber))

            var per10 = document.createElement('div')
            per10.className = 'per-10'
            per10.appendChild(document.createTextNode('/10'))        

            score.appendChild(starImg)
            score.appendChild(userScore)
            score.appendChild(per10)

            var reviewContent = document.createElement('div')
            reviewContent.className = 'review'
            reviewContent.appendChild(document.createTextNode(content))
            
            node.appendChild(reviewer)
            node.appendChild(score)
            node.appendChild(reviewContent)

            originNode.appendChild(userImg)
            originNode.appendChild(node)
            

            document.getElementsByClassName('user-reviews')[0].appendChild(originNode)
        });
    }
    else{
        document.getElementsByClassName('user-reviews')[0].append(document.createTextNode('There are currently no reviews for this movie.'))
    }

    var title = movie_data[movie_id-1]['nama_movie']
    var durasi = movie_data[movie_id-1]['durasi']
    var release_date = movie_data[movie_id-1]['release_date']
    var synopsis = movie_data[movie_id-1]['synopsis']
    
    document.getElementsByClassName('title')[0].innerHTML = title
    document.getElementsByClassName('duration')[0].innerHTML = durasi + ' mins'
    document.getElementsByClassName('release-date')[0].innerHTML = release_date
    document.getElementsByClassName('synopsis')[0].innerHTML = synopsis
    document.getElementsByClassName('score')[0].innerHTML = mean_review_score
    document.getElementsByClassName('img-detail')[0].src = movie_data[movie_id-1]['poster']
    
    //process schedule data
    schedule_data.forEach(element => {
        var dateValue = element['tanggal']
        var timeValue = element['jam']
        var numSeat = 0
        var scheduleId = element['schedule_id']

        ticket_data.forEach(element => {
            if (element['schedule_id'] === scheduleId){
                numSeat++;
            }
        });

        tableRow = document.createElement('tr')
        tableRow.className = 'schedule-table-content'

        date = document.createElement('td')
        date.className = 'schedule-table-date'
        date.appendChild(document.createTextNode(dateValue))

        time = document.createElement('td')
        time.className = 'schedule-table-time'
        time.appendChild(document.createTextNode(timeValue))

        seat = document.createElement('td')
        seat.className = 'schedule-table-num-seat'
        seat.appendChild(document.createTextNode(numSeat))

        availability = document.createElement('td')
        availability.className = 'schedule-table-availability'
        availabilityLink = document.createElement('div')

        if(isAvailable(timeValue, dateValue)){
            availabilityLink.appendChild(document.createTextNode('Book Now'))
            availabilityLink.id = scheduleId
            availabilityLink.className = 'availabile-link'
            availabilityLink.style.color = 'blue'
            availabilityLink.addEventListener("click", function(){goToBuyPage(movie_id, scheduleId)})
        }
        else{
            availabilityLink.appendChild(document.createTextNode('Unavailable'))
            availabilityLink.className = 'unavailabile-link'
            availabilityLink.style.color = 'red'
        }
        availability.appendChild(availabilityLink)
        
        tableRow.appendChild(date)
        tableRow.appendChild(time)
        tableRow.appendChild(seat)
        tableRow.appendChild(availability)
        
        document.getElementsByClassName('schedule-table')[0].appendChild(tableRow)

    });
});

function goToBuyPage(movie_id, scheduleId){
    setCookie("buy_ticket_movie", movie_id)
    setCookie("buy_ticket_schedule", scheduleId)
    window.location.replace("/buy.html")
}

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
