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
	document.cookie = cookieName+'=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;'
}

function checkCookie(cookieName){
	return getCookie(cookieName) !== "";
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}




// XMLHttpRequest setup
var xhr = new XMLHttpRequest();

// HTMLString is a string in HTML format
// this function return HTML Element based on HTMLString
function createHTMLElement(HTMLString){
	var div = document.createElement('div');
	div.innerHTML = HTMLString.trim();

	return div.firstChild;
}


// HTML Element templates
var transactionContainerElement = createHTMLElement(`<div class="transaction-container"></div>`)
var imageElement = createHTMLElement(`<img src="app/assets/img/jambul.png">`)
var contentDetailElement = createHTMLElement(`<div class="content-detail"></div>`)
var movieTitleElement = createHTMLElement(`<div class="movie-title"></div>`)
var scheduleElement = createHTMLElement(`<div class="schedule"></div>`)
var reviewCheckElement = createHTMLElement(`<div class="review-check">Your review has been submitted.</div>`)
var whiteSpaceElement = createHTMLElement(`<div class="white-space"></div>`)
var reviewButtonElement = createHTMLElement(`<div class="review-button"></div>`)
var addButtonElement = createHTMLElement(`<div class='add-button'></div>`)
var deleteButtonElement = createHTMLElement(`<div class="delete-button"></div>`)
var editButtonElement = createHTMLElement(`<div class="edit-button"></div>`)
var horizontalLineElement = createHTMLElement(`<div class="horizontal-line"></div>`)

// get usenname from cookie
// setCookie('username', 'fatt');
var username = getCookie('active_user');

// send request to api
var readTransactionUserURL = "http://localhost/tugas-besar-1-2019/api/ticket/read_user.php?username=" + username;
xhr.open("GET", readTransactionUserURL, false);
xhr.send();
console.log(xhr.responseText);
var jsonResponse = JSON.parse(xhr.responseText);



var transactionList = []
//check if there is any transaction by this user
if(typeof jsonResponse['message'] == 'undefined'){
	jsonResponse['records'].forEach(function(row){
		transactionList.push(parseInt(row['schedule_id']));
	});
}

console.log("transaction list : " + transactionList);

//read user review
var readReviewUserURL = "http://localhost/tugas-besar-1-2019/api/review/read_user.php?username=" + username
xhr.open("GET", readReviewUserURL, false);
xhr.send()

var jsonResponse = JSON.parse(xhr.responseText);
var reviewedList = [] // list of movie id than has been reviewed

jsonResponse[0]['records'].forEach(function(row){
	reviewedList.push(row['movie_id'])
});



async function loadItBabe() {

	await sleep(1000);
	console.log("1 seconds has passed");


	transactionList.forEach(function(transaction){

		
		var readScheduleURL = "http://localhost/tugas-besar-1-2019/api/schedule/read_schedule.php?schedule_id=" + transaction
		xhr.open("GET", readScheduleURL, false)
		xhr.send()

		console.log("response for transaction "+transaction);
		console.log(xhr.responseText);
		var jsonResponse = JSON.parse(xhr.responseText)

		jadwal = jsonResponse['records'][0]['tanggal'] + " - " + jsonResponse['records'][0]['jam']
		judul = jsonResponse['records'][0]['nama_movie']
		tempMovieId = jsonResponse['records'][0]['movie_id']

		// html template
		var transactionContainerElement = createHTMLElement(`<div class="transaction-container"></div>`)
		var imageContainerElement = createHTMLElement(`<div class="content-img"></div>`)
		var imageElement = createHTMLElement(`<img>`)
		var contentDetailElement = createHTMLElement(`<div class="content-detail"></div>`)
		var movieTitleElement = createHTMLElement(`<div class="movie-title"></div>`)
		var scheduleElement = createHTMLElement(`<div class="schedule"></div>`)
		var keyElement = createHTMLElement(`<p class="key">Schedule:</p>`);
		var valueElement = createHTMLElement(`<p class="value"></p>`)
		var reviewCheckElement = createHTMLElement(`<div class="review-check">Your review has been submitted.</div>`)
		var whiteSpaceElement = createHTMLElement(`<div class="white-space"></div>`)
		var reviewButtonElement = createHTMLElement(`<div class="review-button"></div>`)
		var addButtonElement = createHTMLElement(`<button class='add-button'  value=`+  tempMovieId +` onclick ='postItBabe(this)' >Submit Review</button>`)
		var deleteButtonElement = createHTMLElement(`<button class="delete-button"  value=`+  tempMovieId +` onclick='deleteItBabe(this)'>Delete Review</button>`)
		var editButtonElement = createHTMLElement(`<button class="edit-button" value=`+ tempMovieId  +` onclick='editItBabe(this)'>Edit Review</button>`)
		var horizontalLineElement = createHTMLElement(`<div class="horizontal-line"></div>`)


		// use bottom up approach to build the transaction container

		//add src to the image
		imageElement.src = jsonResponse['records'][0]['poster']

		// build image container
		imageContainerElement.appendChild(imageElement)

		// fill value element
		valueElement.innerHTML = jadwal;

		// build schedule element
		scheduleElement.appendChild(keyElement);
		scheduleElement.appendChild(valueElement);

		// build content detail element
		movieTitleElement.innerHTML = judul
		contentDetailElement.appendChild(movieTitleElement)
		scheduleElement.innerHTMl = jadwal
		contentDetailElement.appendChild(scheduleElement)
		// check if user has submitted his review before
		if(reviewedList.includes(tempMovieId)){
			contentDetailElement.appendChild(reviewCheckElement)
		}


		var today = new Date();
		var now = ''
		now += today.getFullYear() + "-" + String(today.getMonth()+1).padStart(2,'0') + '-' + String(today.getDate()).padStart(2, '0') +"-"+ String(today.getHours()).padStart(2, '0')
		console.log("now :"+now)
		airingTime = jsonResponse['records'][0]['tanggal'] + "-" + (jsonResponse['records'][0]['jam']).padStart(2,'0');
		console.log("airing time :"+airingTime)

		// built review button
		// check if user has been watching it yet
		if(now > airingTime){
			if(reviewedList.includes(tempMovieId)){
				reviewButtonElement.appendChild(deleteButtonElement)
				reviewButtonElement.appendChild(editButtonElement)
			} else {
				reviewButtonElement.appendChild(addButtonElement)
			}
		}

		// now build the transaction container
		transactionContainerElement.appendChild(imageContainerElement)
		transactionContainerElement.appendChild(contentDetailElement)
		transactionContainerElement.appendChild(reviewButtonElement)
		

		// now append transaction container to content list container
		document.getElementsByClassName('content-list-container')[0].appendChild(transactionContainerElement)
		document.getElementsByClassName('content-list-container')[0].appendChild(horizontalLineElement)


	});
}

loadItBabe();

function deleteItBabe(button){
	console.log("delet this");
	mID = button.value;
	var deleteReviewURL = "http://localhost/tugas-besar-1-2019/api/review/delete.php"
	requestBody = {'username':username, 'movie_id':mID}
	xhr.open("POST", deleteReviewURL, false)
	xhr.send(JSON.stringify(requestBody))
	setCookie('username',username)
	setCookie('movie_id',mID)
	alert('review deleted');
	// loadItBabe();
	// window.location.replace(host+":"+port+"/transaction.html");
}

function postItBabe(button){
	mID = button.value;
	setCookie('movie_id',mID);
	console.log("redirecting...");
	window.location.replace("user-review.html");
	// var createReviewURL = host+":"+port+"/api/review/create.php"
	// requestBody = {'username':username, 'movie_id':mID}
	// xhr.open("POST", createReviewURL, false)
	// xhr.send(JSON.stringify(requestBody))
	setCookie('username',username)
	setCookie('movie_id',mID)
	setCookie('schedule_id', schedule_id)
}

function editItBabe(button){
	mID = button.value;
	setCookie('movie_id', mID)
	console.log("redirecting...");
	window.location.replace("user-review.html");
	// var updateReviewURL = host+":"+port+"/api/review/update.php"
	// requestBody = {'username':username, 'movie_id':mID}
	// xhr.open("POST", updateReviewURL, false)
	// xhr.send(JSON.stringify(requestBody))
	setCookie('username',username)
	setCookie('movie_id',mID)
	setCookie('schedule_id', schedule_id)
}