

// var xhr = new XMLHttpRequest();
// var host = "http://127.0.0.1";
// var port = "8000"


var login = document.getElementById("form-submit");

var apiRequest = fetch('http://localhost/tugas-besar-1-2019/api/user/read.php').then(function(response){
  return response.json()
})

Promise.all([apiRequest]).then(function(value){

  var user_data = value[0]['records']

  function handle_login(email, password){
    var found = false
    var user
    var email =  document.getElementById("email").value;
    var password = document.getElementById("password").value;

    user_data.forEach(element => {
      console.log(typeof element)
      if(element['email'] == email){
        if(element['password'] == password){
          found = true
          user = element
        }
      }
    });

    if(found == false){
      console.log("Login unsuccessful")
      window.location.replace("/login .html");
    }
    else{
      setCookie('active_user', user['username'])
      window.location.replace("/home.html");
    }
  }
  login.addEventListener("click", function(){handle_login(email, password)})

  
  console.log(user_data)
})

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
