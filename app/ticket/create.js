// import {getCookie, setCookie, deleteCookie, checkCookie} from "../cookie.js"


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











var xhr = new XMLHttpRequest();

// HTMLString is a string in HTML format
// this function return HTML Element based on HTMLString
function createHTMLElement(HTMLString){
	var div = document.createElement('div');
	div.innerHTML = HTMLString.trim();

	return div.firstChild;
}







// get taken seat list 
var username = getCookie('active_user');
var schedule_date = getCookie('buy_ticket_schedule');
var movie_id = getCookie('buy_ticket_movie');
var selectedSeat= 0
// API endpoint to get list of kursi that is taken
// var readKursiScheduleURL = "http://localhost/engimav2/api/ticket/read_schedule.php?schedule_id=" + schedule_id;
var readKursiScheduleURL = "http://localhost/engimav2/api/ticket/read_schedule.php?schedule_date=" + schedule_date + "&movie_id=" + movie_id;

xhr.open("GET", readKursiScheduleURL, false);
xhr.send(); // send request to API endpoint
console.log("api response :" + xhr.responseText);
var takenList = []

var jsonResponse = JSON.parse(xhr.responseText);
// console.log(jsonResponse);
// 
if(typeof jsonResponse['message'] == 'undefined'){
	jsonResponse['records'].forEach(function(row){
		takenList.push(parseInt(row['kursi']));
	});
}

console.log("list of taken kursi");
takenList.forEach(function(kursi){
	console.log(kursi);
	// console.log(typeof kursi)
});


// get time for this schedule_id
var readMovieURL = 'https://api.themoviedb.org/3/movie/'+movie_id+'?api_key=724dae92117735bb7f07f3f8a95157a0'
xhr.open("GET", readMovieURL, false);
xhr.send()

var jsonResponse = JSON.parse(xhr.responseText)

var judul = jsonResponse['original_title']


	



// window.onload = function(){
async function loadItBabe(){

	// await sleep(500);
	// console.log("0.5 seconds has passed")
	// deleteCookie('schedule_id');
	// deleteCookie('username');

	// HTML Element template for the page
	var blankSpace = createHTMLElement(`<div class"blank-space"></div>`)
	var movieTitleElement = createHTMLElement(`<p class="movie-title"></p>`);
	// var alertElement = createHTMLElement(`<p class="alert">You haven't selected any seat yet. Please click on one of the seat provided</p>`);
	var alertElement = document.getElementsByClassName('alert')[0]

	// wait DOM to be loaded

	// get cookies, this will be used later on sending request to API


	// dummy id
	// schedule_id =1




	// fill kursi container with kursi
	for(var i=1; i<=30; i++){
		// console.log(i);
		// check if kursi is taken
		if(takenList.includes(i)){
			// console.log(i+ " is in taken list")
			var kursiTakenElement = createHTMLElement(`<button  onclick='sendItBabe(this)' class='kursi taken'`+ ` id='kursi`+ i + `'` +` value=`+ i + `>`+ i +`</button>`);
			// kursiTakenElement.innerHTML = i;
			var temp = kursiTakenElement;
		} else {
			// console.log(i + " not in taken list")
			var kursiAvailableElement = createHTMLElement(`<button onclick='sendItBabe(this)' class='kursi available'`+  ` id=kursi`+ i + `'` +` value=`+ i + `>`+ i +`</button>`);
			// kursiAvailableElement.innerHTMl = i;
			var temp = kursiAvailableElement
		}
		document.getElementById('kursi-container').appendChild(temp);
	}

	var upperScheduleElement = document.createElement('div')
	upperScheduleElement.innerHTML = schedule_date + " - " + "14:00";
	movieTitleElement.innerHTML = judul;
	document.getElementsByClassName("movie-schedule")[0].appendChild(movieTitleElement);
	document.getElementsByClassName("movie-schedule")[0].appendChild(upperScheduleElement);
	// check if any seat is selected


	// if any seat is selected, remove alert from summary, then add movie title and schedule
	// document.getElementsByClassName('summary')[0].removeChild(alertElement); // idk if this works or not
	alertElement.remove();
	document.getElementsByClassName('summary')[0].appendChild(blankSpace);
	// document.getElementsByClassName('summary')[0].appendChild(scheduleElement);

	setCookie('movie_id',2);
	// deleteCookie("movie_id");
}

function sendItBabe(button){
	selectedSeat = button.value;
	console.log("selected seat : " + selectedSeat);

	if(!takenList.includes(selectedSeat)){
		var ticketTitleElement = createHTMLElement(`<p class="ticket-title"></p>`);
		var seatPriceElement = createHTMLElement(`<div class="seat-price"></div>`);
		var buyButtonElemen = createHTMLElement(`<a class="buy-button" href="#" onclick="buyItBabe()">Buy Ticket</a>`)
		var seatNumberElement = createHTMLElement(`<a id='seat'></a>`);
		var priceElement = createHTMLElement(`<a id='price'>Rp 45.000</a>`)
		var scheduleElement = createHTMLElement(`<p class="schedule"></p>`);

		if(document.body.contains(document.getElementsByClassName("ticket-title")[0])){
			node = document.getElementsByClassName("ticket-title")[0]
			node.parentNode.removeChild(node)		
			node = document.getElementsByClassName("schedule")[0]
			node.parentNode.removeChild(node)
			node = document.getElementsByClassName("seat-price")[0]
			node.parentNode.removeChild(node)
			node = document.getElementsByClassName("buy-button")[0]
			node.parentNode.removeChild(node)
		}

		seatNumberElement.innerHTML = "#" + selectedSeat;
		scheduleElement.innerHTML = schedule_date + " - " + "14:00";
		ticketTitleElement.innerHTML = judul;

		seatPriceElement.appendChild(seatNumberElement);
		seatPriceElement.appendChild(priceElement);	
		// document.getElementsByClassName('summary')[0].appendChild(ticketTitleElement);

		document.getElementsByClassName('summary')[0].appendChild(ticketTitleElement);
		document.getElementsByClassName('summary')[0].appendChild(scheduleElement);
		document.getElementsByClassName('summary')[0].appendChild(seatPriceElement);
		document.getElementsByClassName('summary')[0].appendChild(buyButtonElemen);

	}
}

function buyItBabe(){

	//request to create new virtual account
	var bankServiceURL = 'http://100.26.43.243:8080/bankprowebservice-1.0-SNAPSHOT/NewWebService?wsdl'
	xhr = new XMLHttpRequest()
	xhr.open('POST', bankServiceURL, false)
	var xmlRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mav="http://mavenproject3.mycompany.com/">'+
				'<soapenv:Header/>'+
				'<soapenv:Body>'+
				'<mav:addVirtualAccount>'+
					'<!--Optional:-->'+
					'<Rekening>1234567</Rekening>'+
				'</mav:addVirtualAccount>'+
				'</soapenv:Body>'+
			'</soapenv:Envelope>'

	xhr.setRequestHeader('Content-Type', 'text/xml')
	xhr.send(xmlRequest)

	console.log("This is the Response"); console.log(xhr.responseText)

	//get the newly created virtual account number
	virtualAccNum = xhr.responseText.split('<return>').pop().split('</return>')[0]
	console.log('The new virtual account number'); console.log(virtualAccNum)

	// set up request body
	//remember to set up VIRTUAL ACCOUNT
	var timestamp = new Date()
	var current_date = timestamp.toISOString().split('T')[0]
	var current_time = timestamp.constructor().split(' ')[4]
	var timestamp = current_date + ' ' + current_time
	var requestBody = {'user_id':username,
					'movie_id':movie_id,
					'seat':parseInt(selectedSeat),
					'virtual_acc': virtualAccNum,
					'movie_sched':schedule_date,
					'time_added':timestamp}
	console.log(requestBody)

	//send to transaction API first, can't create ticket directly
	var createTxnURL = "http://localhost:9090/transaction/add"
	var buyingTicketURL = "http://localhost/engimav2/api/ticket/create.php"
	
	xhr = new XMLHttpRequest()
	xhr.open("POST", createTxnURL, false)
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.send(JSON.stringify(requestBody));

	console.log(xhr.responseText)
	jsonResponse = JSON.parse(xhr.responseText);
	if(jsonResponse['status'] == 200){
		alert("Thank you for your purchase, don't forget to pay for the ticket in order to see the movie");
	} else {
		alert(jsonResponse['message']);
	}
	console.log("is alert closed yet?");
	// window.location.replace("transaction.html");
	// jsonResponse = JSON.parse(xhr.responseText)

}

loadItBabe();

