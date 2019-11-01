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
// setCookie('username', 'fatt')
// setCookie('movie_id', 3)
// setCookie('schedule_id',4)
var username = getCookie('username')
var movie_id = getCookie('movie_id')
var schedule_id = getCookie('schedule_id')
// if(checkCookie('schedule_id')){
// 	alert("schedule id cookie exist")
// } else {
// 	alert("it doesnt")
// }
// alert("schedule id="+schedule_id+" username:"+username+"movie_id:"+movie_id)

async function loadItBabe(){

	//await sleep(1000);
	console.log("one second passed")
	// html template 
	var movieTitleElement = createHTMLElement(`<div class="movie-title"></div>`)
	var buttonsElement = createHTMLElement(`<div class="buttons"></div>`)
	var editButtonElement = createHTMLElement(`<input class="edit-button" type="submit" onclick="editItBabe()" name="Edit">`)
	var addButtonElement = createHTMLElement(`<input class="add-button" type="submit" onclick="postItBabe()" name="Submit">`)
	var cancelButtonElement = createHTMLElement(`<a href="/transaction.html" class="cancel-button" onclick="goBack()">Cancel</a>`)

	// send request to API
	var readUserReviewURL = "http://localhost/tugas-besar-1-2019/api/review/read_user.php?username=" + username
	xhr.open("GET",readUserReviewURL, false)
	xhr.send()

	console.log(xhr.responseText);
	// check if user has already reviewed the movie
	var jsonResponse = JSON.parse(xhr.responseText)

	// list of movie user has been reviewed
	var reviewList = []
	// check if user have any reviews yet
	console.log("username : "+username)
	console.log("movie_id : "+movie_id )

	console.log("response : " + jsonResponse)
	if(typeof jsonResponse['message'] == 'undefined'){
		jsonResponse[0]['records'].forEach(function(row){
			reviewList.push(row['movie_id'])
		});
	} 
	console.log(reviewList)


	if(reviewList.includes(movie_id)){
		buttonsElement.appendChild(editButtonElement);
		var oldContent = ""
		var oldSkor = 0
		jsonResponse[0]['records'].forEach(function(row){
			if(row['movie_id'] == movie_id){
				oldContent += row['content']
				oldSkor = row['skor']
				// console.log("old skor :"oldSkor)
			}
		});
		document.getElementsByTagName('textarea')[0].innerHTML = oldContent;
		document.getElementById('stars').value = oldSkor

	} else {
		buttonsElement.appendChild(addButtonElement);
	}

	buttonsElement.appendChild(cancelButtonElement);
	console.log("schid :" +schedule_id)
	var readScheduleURL = "http://localhost/tugas-besar-1-2019/api/schedule/read_schedule.php?schedule_id=" + schedule_id
	xhr.open("GET", readScheduleURL, false)
	xhr.send()
	var jsonResponse = JSON.parse(xhr.responseText)
	console.log(jsonResponse);
	if(typeof jsonResponse['message'] == 'undefined')
	var judul = jsonResponse['records'][0]['nama_movie'];

	movieTitleElement.innerHTML = judul

	document.getElementsByClassName('head-container')[0].appendChild(movieTitleElement);
	document.getElementsByClassName('review-box')[0].appendChild(buttonsElement);
}

loadItBabe();

function postItBabe(){
	console.log("creating review")
	var content = document.getElementsByTagName('textarea')[0].value;
	console.log(content)
	temp = document.getElementById('stars')
	var skor = temp.options[temp.selectedIndex].value
	console.log(skor)

	var requestBody = {'username':username,"movie_id":movie_id,"skor":skor,'content':content}
	var createReviewURL = "http://localhost/tugas-besar-1-2019/api/review/create.php"
	xhr.open("POST", createReviewURL, false)
	xhr.send(JSON.stringify(requestBody))

	jsonResponse = JSON.parse(xhr.responseText)
	alert(jsonResponse['message'])
	console.log(xhr.responseText)
	window.location.replace("/transaction.html");
}

function editItBabe(){
	console.log("updating review")
	var content = document.getElementsByTagName('textarea')[0].value;
	console.log(content)
	temp = document.getElementById('stars')
	var skor = temp.options[temp.selectedIndex].value
	console.log(skor)

	var requestBody = {'username':username,"movie_id":movie_id,"skor":1,'content':content}
	var updateReviewURL = "http://localhost/tugas-besar-1-2019/api/review/update.php"
	xhr.open("POST", updateReviewURL, false)
	xhr.send(JSON.stringify(requestBody))

	jsonResponse = JSON.parse(xhr.responseText)
	alert(jsonResponse['message'])
	console.log(xhr.responseText)
	window.location.replace("/transaction.html");
}

function goBack(){
	console.log("duck go back")
	// window.location.replace("file:///home/aryuuu/kuliah/5/wbd/tugas-besar-1-2019/transaction.html");
	
}