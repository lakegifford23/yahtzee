import dice from './dice.js';
import Dice from './Dice.js';
import Scorecard from './Scorecard.js';
let countdown = 3;
let myDice = new dice();
window.myDice = myDice; //needed to run tests...

let player = new Scorecard();
let catElements = player.getCategoryElements();


//---------------------Event Listeners-----------------------------------------/
document.getElementById('new-game').addEventListener("click", newGame);
document.getElementById('save-game').addEventListener("click", saveGame);
document.getElementById('load-game').addEventListener("click", loadGame);
document.getElementById('roll-dice').addEventListener("click", rollDice);

for(let i = 0 ; i <= 4; i ++){
    document.getElementById("die-" + i).addEventListener('dblclick', reserve);
}

for(let i in catElements){
  document.getElementById(catElements[i].id).addEventListener("keypress", keyCheck);
}

//---------------------Event Listener Functions-----------------------------------------/
function keyCheck(event){
  if(event.code == "Enter"){
    if(player.enterScore(event.target, event.target.value, myDice.getDiceArray())){
      player.isFull();
      if(player.isFull()){
        feedback('good', "game over. click new game to try again!");
      }else{
      feedback('', '');
      myDice.reset();
      countdown = 3;
      document.getElementById('rolls-remaining').innerHTML = countdown;
    }

    }else{
      feedback('bad', "that's not a valid score. try again.");
    }
}
}


function newGame(){
  feedback('good', "new game sucessfuly started! good luck!");
  countdown = 3;
  document.getElementById('rolls-remaining').innerHTML = countdown;
  myDice.reset();
  player.reset();
}

function saveGame(){
  localStorage.setItem("scorecard-info", JSON.stringify(player.toObject()));
  localStorage.setItem("save-game", "passed");
  feedback('good', "game sucessfuly saved!");
}

function loadGame(){
  if(localStorage.getItem("save-game") == "passed"){
    player.loadScores(JSON.parse(localStorage.getItem("scorecard-info")));
    feedback('good', "game sucessfuly loaded!");
  }else{
    feedback('bad', "no saved game detected.");
  }
}


function rollDice(){
feedback('','');
  if(countdown>0){
  myDice.roll();
  countdown--;
  document.getElementById('rolls-remaining').innerHTML = countdown;

}else{
  feedback('bad', "you can't roll the dice again, sorry.");
}
//myDice.setDice([1,3,3,3,3]);

}

function reserve(event){
  myDice.reserve(event);
}



/**
 * Updates #feedback-content with an appropriate message and style.
 * If both msg and type are blank, #user-feedback becomes hidden
 *
 * @param {String} type A context (ie. "good"/"bad"/"info") for the feedback
 * @param {String} msg The message to display for the user
 *
 */
function feedback(type, msg) {
  if(msg == '' && type == ''){
    document.getElementById('feedback').class = 'hidden';
  }
  document.getElementById('feedback').setAttribute('class', type);
  document.getElementById('feedback-content').innerHTML = msg;
}
