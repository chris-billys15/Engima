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
var schedule_id = getCookie('buy_ticket_schedule');
var selectedSeat= 0
// API endpoint to get list of kursi that is taken
var readKursiScheduleURL = "http://localhost/tugas-besar-1-2019/api/ticket/read_schedule.php?schedule_id=" + schedule_id;

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
var readScheduleURL = "http://localhost/tugas-besar-1-2019/api/schedule/read_schedule.php?schedule_id=" + schedule_id
xhr.open("GET", readScheduleURL, false);
xhr.send()

var jsonResponse = JSON.parse(xhr.responseText)
console.log(xhr.responseText);
// console.log(jsonResponse)

var tanggal = jsonResponse['records'][0]['tanggal']
var jam = jsonResponse['records'][0]['jam']
var judul = jsonResponse['records'][0]['nama_movie']
console.log("tanggal : " + tanggal)
console.log("jam : " + jam)
console.log("judul : "+ judul)

	



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

	
	upperScheduleElement.innerHTML = tanggal + " - " + jam;
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
		scheduleElement.innerHTML = tanggal + " - " + jam;
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

	// set up request body
	var requestBody = {'username':username,'schedule_id':parseInt(schedule_id),'kursi':parseInt(selectedSeat)}
	console.log(requestBody)

	var buyingTicketURL = "http://localhost/tugas-besar-1-2019/api/ticket/create.php"
	xhr.open("POST", buyingTicketURL, false)
	xhr.send(JSON.stringify(requestBody));

	console.log(xhr.responseText)
	jsonResponse = JSON.parse(xhr.responseText);
	if(jsonResponse['message'] == 'Ticket was created.'){
		alert("Payment success! \nThank you for purchasing! You can now view your puchase now.");
	} else {
		alert(jsonResponse['message']);
	}
	console.log("is alert closed yet?");
	window.location.replace("transaction.html");
	// jsonResponse = JSON.parse(xhr.responseText)

}

loadItBabe();

