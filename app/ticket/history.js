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
var readTransactionUserURL = "http://localhost/engimav2/api/ticket/read_user.php?username=" + username;
var readUserTxn = "http://localhost:9090/users/" + username
xhr.open("GET", readUserTxn, false);
xhr.send();
console.log("Response Test\n"+xhr.responseText);
var jsonResponse = JSON.parse(xhr.responseText);
console.log(jsonResponse)


var transactionList = jsonResponse['values']
// check if there is any transaction by this user
// if(typeof jsonResponse['message'] == 'undefined'){
// 	jsonResponse['values'].forEach(function(row){
// 		transactionList.push(parseInt(row['id']));
// 	});
// }

console.log("transaction list : " + transactionList);

//read user review
var readReviewUserURL = "http://localhost/engimav2/api/review/read_user.php?username=" + username
xhr.open("GET", readReviewUserURL, false);
xhr.send()

var jsonResponse = JSON.parse(xhr.responseText);
console.log(jsonResponse)
var reviewedList = [] // list of movie id than has been reviewed

jsonResponse[0]['records'].forEach(function(row){
	reviewedList.push(row['movie_id'])
});
console.log(reviewedList)


async function loadItBabe() {

	await sleep(1000);
	console.log("1 seconds has passed");


	transactionList.forEach(function(transaction){

		
		// var readScheduleURL = "http://localhost/engimav2/api/schedule/read_schedule.php?schedule_id=" + transaction
		// xhr.open("GET", readScheduleURL, false)
		// xhr.send()

		console.log(transaction);
		// console.log(xhr.responseText);
		// var jsonResponse = JSON.parse(xhr.responseText)

		let transactionStatus;
		let tempMovieId = transaction['movie_id']

		//find movie details
		let movieDetailURL = "https://api.themoviedb.org/3/movie/"+ tempMovieId +"?api_key=724dae92117735bb7f07f3f8a95157a0" 
		xhr = new XMLHttpRequest()
		xhr.open('GET', movieDetailURL, false)
		xhr.send()
		movieData = (JSON.parse(xhr.responseText))

		//get transactional datas from bank
		var parsedStartDateTime = transaction['time_added'].split('.')[0]
		var parsedEndDateTime = (new Date(parsedStartDateTime))
		parsedEndDateTime.setMinutes(parsedEndDateTime.getMinutes() + 2)
		parsedEndDateTime = parsedEndDateTime.toISOString().split('.')[0]
		var xmlBankRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mav="http://mavenproject3.mycompany.com/">
			<soapenv:Header/>
			<soapenv:Body>
			<mav:checkTransaction>
				<!--Optional:-->
				<rekening>`+transaction['virtual_account']+`</rekening>
				<!--Optional:-->
				<nominal>45000</nominal>
				<!--Optional:-->
				<startDate>`+parsedStartDateTime+`</startDate>
				<!--Optional:-->
				<finishDate>`+parsedEndDateTime+`</finishDate>
			</mav:checkTransaction>
			</soapenv:Body>
		</soapenv:Envelope>`
		console.log('the XML Request:\n'+xmlBankRequest)
		var bankServiceURL = 'http://100.26.43.243:8080/bankprowebservice-1.0-SNAPSHOT/NewWebService?wsdl'
		var xhr = new XMLHttpRequest()
		xhr.open('POST', bankServiceURL, false)
		xhr.setRequestHeader('Content-Type', 'text/xml')
		xhr.send(xmlBankRequest)

		isTransactionExist = xhr.responseText.split('<return>').pop().split('</return>')[0]
		if (isTransactionExist == 'false'){
			isTransactionExist = false
			//if already passed time limit, set transaction status to cancelled

			//else, still pending
		}
		else{
			//if transaction exists
			isTransactionExist = true
		}
		console.log('The new virtual account number'); console.log(virtualAccNum)

		// jadwal = jsonResponse['records'][0]['tanggal'] + " - " + jsonResponse['records'][0]['jam']
		judul = movieData['original_title']

		// html template
		var transactionContainerElement = createHTMLElement(`<div class="transaction-container"></div>`)
		var imageContainerElement = createHTMLElement(`<div class="content-img"></div>`)
		var imageElement = createHTMLElement(`<img>`)
		var contentDetailElement = createHTMLElement(`<div class="content-detail"></div>`)
		var movieTitleElement = createHTMLElement(`<div class="movie-title"></div>`)
		var scheduleElement = createHTMLElement(`<div class="schedule"></div>`)
		var keyElement = createHTMLElement(`<p class="key">Schedule:</p>`);
		var valueElement = createHTMLElement(`<p class="value"></p>`)
		var statusElement = createHTMLElement(`<div class="status"></div>`)
		var statusKey = createHTMLElement(`<p class="status-key">Status:</p>`);
		var statusValue = createHTMLElement(`<p class="status-value"></p>`)
		var reviewCheckElement = createHTMLElement(`<div class="review-check">Your review has been submitted.</div>`)
		var whiteSpaceElement = createHTMLElement(`<div class="white-space"></div>`)
		var reviewButtonElement = createHTMLElement(`<div class="review-button"></div>`)
		var addButtonElement = createHTMLElement(`<button class='add-button'  value=`+  tempMovieId +` onclick ='postItBabe(this)' >Submit Review</button>`)
		var deleteButtonElement = createHTMLElement(`<button class="delete-button"  value=`+  tempMovieId +` onclick='deleteItBabe(this)'>Delete Review</button>`)
		var editButtonElement = createHTMLElement(`<button class="edit-button" value=`+ tempMovieId  +` onclick='editItBabe(this)'>Edit Review</button>`)
		var horizontalLineElement = createHTMLElement(`<div class="horizontal-line"></div>`)


		// use bottom up approach to build the transaction container

		//add src to the image
		imageElement.src = 'http://image.tmdb.org/t/p/w342' + movieData['poster_path']

		// build image container
		imageContainerElement.appendChild(imageElement)

		// fill value element
		airingTime = new Date(transaction['schedule_date'])
		airingTime.setHours(airingTime.getHours() - 7)
		console.log("airing time :"+airingTime)
		valueElement.innerHTML = airingTime.toLocaleDateString() + ' ' + airingTime.toLocaleTimeString();

		// build schedule element
		scheduleElement.appendChild(keyElement);
		scheduleElement.appendChild(valueElement);

		// fill value element
		statusValue.innerHTML = transactionStatus;

		//build status element
		statusElement.appendChild(statusKey);
		statusElement.appendChild(statusValue);

		// build content detail element
		movieTitleElement.innerHTML = judul
		contentDetailElement.appendChild(movieTitleElement)
		contentDetailElement.appendChild(scheduleElement)
		contentDetailElement.appendChild(statusElement)
		// check if user has submitted his review before
		// if(reviewedList.includes(tempMovieId)){
		// 	console.log("went here -1")
		// 	contentDetailElement.appendChild(reviewCheckElement)
		// }

		var today = new Date();
		var now = new Date()
		// now += today.getFullYear() + "-" + String(today.getMonth()+1).padStart(2,'0') + '-' + String(today.getDate()).padStart(2, '0') +"-"+ String(today.getHours()).padStart(2, '0')
		console.log("now :"+now)
		// airingTime = jsonResponse['records'][0]['tanggal'] + "-" + (jsonResponse['records'][0]['jam']).padStart(2,'0');

		// built review button
		// check if user has been watching it yet
		if((transaction['status'] == 'COMPLETED')){
			if(reviewedList.includes((tempMovieId.toString()))){
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
	var deleteReviewURL = "http://localhost/engimav2/api/review/delete.php"
	requestBody = {'username':username, 'movie_id':mID}
	xhr.open("POST", deleteReviewURL, false)
	xhr.setRequestHeader('Content-Type', 'application/json')
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