function validateFormRegistrasi() {

    var a = document.forms["register-form"]["username"].value;

    if (a.length > 20) {
        document.getElementById("un").innerHTML = "Full name must be filled with maximum 20 characters";
        return false;
    } else {
        document.getElementById("un").innerHTML = "";
    }

    if(!validate_username(a)){
        document.getElementById("un").innerHTML = "Username hanya menerima kombinasi alphabet, angka, dan underscore.";
        return false;
    } else {
          document.getElementById("un").innerHTML = "";
    }

    var b = document.forms["register-form"]["email"].value;

//    if(!ValidateEmail(b)){
//        document.getElementById("em").innerHTML = "Format Tidak valid";
//        return false;
//    } else {
//        document.getElementById("em").innerHTML = "";
//    }

    var c = document.forms["register-form"]["phone"].value;
    if (c.length < 9 || c.length > 12) {
        document.getElementById("pn").innerHTML = "Phone number must be filled with 9-12 digits number";
        return false;
      } else {
          document.getElementById("pn").innerHTML = "";
      }
    var isnum = /^\d+$/.test(c);

    if (isnum == false) {
        document.getElementById("pn").innerHTML = "Wrong phone number format";
        alert("Wrong phone number format");
        return false;
      } else {
          document.getElementById("pn").innerHTML = "";
      }


    var d = document.forms["register-form"]["password"].value;
    var e = document.forms["register-form"]["confirm_password"].value;

    if (d != e) {
        document.getElementById("cpass").innerHTML = "The password doesn't match!";
        return false;
      } else {
          document.getElementById("cpass").innerHTML = "";
      }


      return true;

}


function ValidateEmail(mail)
{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value))
    {
        return true;
    }
    return false;
}

function validate_username(field)
{
    var re = /^\w+$/;
    if (!re.test(field.value)) {
        return false;
    }
    return true;
}
