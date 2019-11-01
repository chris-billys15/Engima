usernameValid = false
function validateUsername(str){
    
    if(str.length > 0){
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function(){
            var valid = false

            if(this.readyState == 4 && this.status == 200){
                document.getElementById("un").innerHTML = "The username "+str+" already exists. Please choose another one."; 
            }
            else{
                if(!validateUsernamePattern(str )){
                    document.getElementById("un").innerHTML = "Username can only be a combination of alphabet, numbers, and underscore."
                }
                else{
                    document.getElementById("un").innerHTML = ""; 
                    usernameValid = true
                }
            }
        }
        xhr.open('GET', 'http://localhost/tugas-besar-1-2019/api/user/read_one.php?username='+str)
        xhr.send()
    }
}

var emailValid = false
function validateEmail(str){
    if(str.length > 0){
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function(){
            var valid = false

            if(this.readyState == 4 && this.status == 200){
                document.getElementById("em").innerHTML = "The email "+str+" is already used. Please choose another one."; 
            }
            else{
                if(!ValidateEmailPattern(str)){
                    document.getElementById("em").innerHTML = "The email must be in the format user@mail.com";
                }
                else{
                    document.getElementById("em").innerHTML = "";
                    emailValid = true
                } 
            }
        }
        xhr.open('GET', 'http://localhost/tugas-besar-1-2019/api/user/read_one.php?email='+str)
        xhr.send()
    }
}

var phoneValid = false
function validatePhone(str){
    if(str.length > 0){
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){
                document.getElementById("pn").innerHTML = "The number "+str+" is already used. Please choose another one."; 
            }
            else{
                if(str.length < 9 ||  str.length > 12){
                    document.getElementById("pn").innerHTML = "The length of phone number must be between 9 and 12";
                }
                else{
                    document.getElementById("pn").innerHTML = ""; 
                    phoneValid = true
                }
            }
        }
        xhr.open('GET', 'http://localhost/tugas-besar-1-2019/api/user/read_one.php?phone='+str)
        xhr.send()
    }
}

function ValidateEmailPattern(mail)
{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());    
}

function validateUsernamePattern(username)
{
    var re = /^[a-z0-9_]+$/i
    return re.test(String(username).toLowerCase());  
}

function isEqualPassword(pass, confirm_pass){
    return pass == confirm_pass
}

function validateFormRegistrasi() {
    var pass = document.getElementById("password").value
    var confirm_pass = document.getElementById("confirm_password").value

    return usernameValid && emailValid && phoneValid && isEqualPassword(pass, confirm_pass);
}

function processRegistration(){
    if(validateFormRegistrasi()){
        var newUser = function(username, email, phone, password, profile_pic){
            this.username = username
            this.email = email
            this.phone = phone
            this.password = password
            this.profile_pic = profile_pic
        }
        var username = document.getElementById("username").value
        var email = document.getElementById("email").value
        var phone = document.getElementById("phone").value
        var password = document.getElementById("password").value
        var profile_pic = document.getElementById("profile_pic").value

        var createUser = new newUser(username, email, phone, password, profile_pic)
        
        console.log(JSON.stringify(createUser))

        var xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://localhost/tugas-besar-1-2019/api/user/create.php', false)
        xhr.send(JSON.stringify(createUser))

        
        setCookie('active_user', username)

        window.location.replace("home.html");
    }
}

function setCookie(cookieName, cookieValue){

	var d = new Date();
	d.setTime(d.getTime() + (3600*1000)); //set cookie to expire in one hour
	var expires = "expires="+d.toUTCString();
	document.cookie = cookieName + "=" + cookieValue + ";" + expires + "path=/";
}

