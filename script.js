//prepare to add some jQuery
localStorage.clear();
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

function chooseNumbers() {
  var choice = [];
  for(var x = 0; x < 5; x++) {
    var number = prompt("Choose a number between 1 and 50. (Choice " + (x+1) + " of 5)");
    while(choice.indexOf(number) != -1) {
      number = prompt("You have already chose that. Try again. (Choice " + (x+1) + " of 5)");
    }
    choice.push(number);
  }
  document.getElementById("choices").innerHTML = "You chose: " + choice;
}
function playGame() {
  if(credits == 0) {
    return alert("Sorry, you have no credits left!");
  } else {
    credits -= 25;
    localStorage.setItem('credits', credits);
    chooseNumbers();

    creditpara.innerHTML = "You currently have " + localStorage.getItem('credits') + " credits.";
  }
}
//add range checking [TO DO], and seeing if number already was inputted [DONE]
