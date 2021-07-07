
  function submitForm(){
    var name = document.forms["form"]["name"].value;
    var email = document.forms["form"]["email"].value;
    var adr = document.forms["form"]["adr"].value;
    var zip = document.forms["form"]["zip"].value;
    var cname = document.forms["form"]["cname"].value;
    var ccnum = document.forms["form"]["ccnum"].value;
    var expyear = document.forms["form"]["expyear"].value;
    var cvv = document.forms["form"]["cvv"].value;
    if (name == null || name == "", email == null || email == "", adr == null || adr == "", 
    zip == null || zip == "", cname == null || cname == "", ccnum == null || ccnum == "", 
    expyear == null || expyear == "", cvv == null || cvv == "") {
      return false;
    }
    
    if(typeof(localStorage) != "undefined"){
        localStorage.name = document.getElementById("name").value;
        localStorage.email = document.getElementById("email").value;
        localStorage.adr = document.getElementById("adr").value;
        localStorage.zip = document.getElementById("zip").value;
        localStorage.cname = document.getElementById("cname").value;
        localStorage.ccnum = document.getElementById("ccnum").value;
        localStorage.expyear = document.getElementById("expyear").value;
        localStorage.card = document.getElementById("card").value;
        localStorage.item = document.getElementById("item").value;
        localStorage.total = document.getElementById("total").value;
    }
    document.getElementById("form").submit();
}