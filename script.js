//prepare to add some jQuery
var intropara = document.getElementById("intro");
function setUserName() {
  var name = prompt("Welcome! Please enter your name:");
  if(name == null) {
    name = "friend";
  }
  localStorage.setItem('name', name);
  intropara.innerHTML = "Have fun in the Casino, " + name + "!";
}

if(!localStorage.getItem('name')) {
  setUserName();
} else {
  intropara.innerHTML = "Glad to have you back, " + localStorage.getItem('name') + "!";
}

var creditpara = document.getElementById("creditcount");
var credits = 100;

//check to see if the user has any credits, else sets to default of 100.
if(localStorage.getItem('credits')) {
  creditpara.innerHTML = "You currently have " + localStorage.getItem('credits') + " credits.";
  credits = localStorage.getItem('credits');
} else {
  localStorage.setItem('credits', credits);
}

function playGame() {
  if(credits == 0) {
    return alert("Sorry, you have no credits left!");
  } else {
    credits -= 25;
    localStorage.setItem('credits', credits);

    //ACTUAL GAME INPUT CODE GOES HERE

    creditpara.innerHTML = "You currently have " + localStorage.getItem('credits') + " credits.";
  }
}
