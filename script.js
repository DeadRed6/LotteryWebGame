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
var multiplier = 1;

//check to see if the user has any credits, else sets to default of 100.
if(localStorage.getItem('credits')) {
  creditpara.innerHTML = "You currently have " + localStorage.getItem('credits') + " credits.";
  credits = localStorage.getItem('credits');
} else {
  localStorage.setItem('credits', credits);
}
//also checks if the user has a win streak/multiplier.
if(localStorage.getItem('multiplier')) {
  mutiplier = localStorage.setItem('multiplier', multiplier)
  document.getElementById('winstreak').innerHTML = "Your current multiplier is " + localStorage.getItem('multiplier') + "x.";
} else {
  localStorage.setItem('multiplier', multiplier);
}

var resetData = function() {
  if(confirm("Are you sure you want to delete all user data?")) {
    localStorage.setItem('credits', 100);
    creditpara.innerHTML ="You currently have " + localStorage.getItem('credits') + " credits.";
    localStorage.setItem('multiplier', 1);
    document.getElementById('winstreak').innerHTML = "Your current multiplier is " + localStorage.getItem('multiplier') + "x.";
    setUserName();
  }
}

var choice = [];
var special = 0; //choice and special are global so it can be accessed by all functions
function chooseNumbers() {
  choice.length = 0; //empty choice from other games
  for(var x = 0; x < 4; x++) {
    var number = prompt("Choose a number between 1 and 40. (Choice " + (x+1) + " of 4)");
    while(number < 1 || number > 40) {
      number = prompt("Number out of range, retry. (" + (x+1) + " of 4)");
    }
    while(choice.indexOf(number) != -1) {
      number = prompt("You already chose that, retry. (" + (x+1) + " of 4)");
      while(number < 1 || number > 40) {
        number = prompt("Number out of range, retry. (" + (x+1) + " of 4)");
    }
  }
    choice.push(number);
  } //end of normal choices
  special = prompt("Now choose your lucky bonus! (Range 1-10)");
  while(special > 10 || special < 1) {
    special = prompt("Number out of range, retry.");
  } //end of all player choices
  document.getElementById("choices").innerHTML =
  "You chose: " + choice + ". Bonus: " + special + ". Get ready for the draw in 3 seconds!";
  setTimeout(function() {
    //computer generates numbers
    calculateWin();
  }, 3000);
}

function calculateWin() {
  var drawn = [];
  for(var i = 0; i < 4; i++) {
    var compNumber = Math.floor((Math.random() * 40) + 1);
    while(drawn.indexOf(compNumber) != -1) {
      compNumber = Math.floor((Math.random() * 40) + 1);
    }
    drawn.push(compNumber);
  }
  var compSpecial = Math.floor((Math.random() * 10) + 1);
  while(drawn.indexOf(compNumber) != -1) {
    compNumber = Math.floor((Math.random() * 10) + 1);
  }
  alert("Winning numbers: " + drawn + " Bonus: " + compSpecial);
  //calculates how many matches and shows the user.
  var matched = 0;
  for(var j in drawn) {
    for(var k in choice) {
      if(drawn[j] == choice[k]) {
        matched++;
      }
    }
  }
  alert("You matched " + matched + " normal number(s).\n" + (compSpecial == special?"You matched the bonus!":"You didn't match the bonus."));
  //calculate win;
  var prize = ((50 * matched) + (compSpecial == special?200: 0)) * multiplier;
  alert("This time, you won " + prize + " credits.");
  credits += prize;
  localStorage.setItem('credits', credits);
  creditpara.innerHTML = "You currently have " + localStorage.getItem('credits') + " credits.";
  if(prize > 0 && multiplier != 4) {
    multiplier++;
  } else {
    multiplier = 1;
  }
  localStorage.setItem('multiplier', multiplier);
  document.getElementById('winstreak').innerHTML = "Your current multiplier is " + localStorage.getItem('multiplier') + "x.";
  docuement.getElementById('choices').innerHTML = "";
};
//function that runs when the button is pressed.
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
