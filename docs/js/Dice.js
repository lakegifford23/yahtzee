class Dice {
  #diceLabels;
  #diceElements;
  #diceArray;


  /**
   * The Dice class constructor
   * Initializes:
   * - this.#diceLabels as an array with picture labels
   * - this.#diceElements as an array of HTML elements with an <img> tag for each die
   * - this.#diceArray as a an array with five 0 elements
   */
  constructor() {
    this.#diceLabels = ['blank', 'one', 'two', 'three', 'four', 'five', 'six'];
    this.#diceElements = Array.from(document.getElementsByClassName("die"));
    this.#diceArray = [0, 0, 0, 0, 0];
  }

  /**
   * Returns an array of HTML image tags representing
   * a current view of all five Yahtzee dice
   */
  getDiceElements() {
    return this.#diceElements.slice();
  }

  /**
   * Returns an array of integers representing
   * a current view of all five Yahtzee dice
   * A natural mapping is used to pair each integer with a die picture
   * Dice values: 0 for blank, or 1 - 6
   */
  getDiceArray() {
    return this.#diceArray.slice();
  }

  /**
   * Resets all dice pictures to blank, and unreserved
   * Resets diceArray to all 0's
   */
  reset() {
    for(let i = 0 ; i <= 4; i ++){
      document.getElementById("die-" + i).setAttribute("class", "die");
      this.#setDie(document.getElementById("die-" + i), 0);
    }
  }//reset()

  /**
   * Performs all necessary actions to roll and update display of dice
   * Changes src to reflect new value
   * Updates this.#diceArray
   */

  roll() {

    console.log("Rolling the dice");
    for(let i = 0; i <= 4; i ++){
      if(document.getElementById("die-" + i).getAttribute("class") == "die"){
        this.#setDie(document.getElementById("die-" + i), Math.floor(Math.random() * 6) +1);
      }
    }

  }//roll()

  /**
   * Performs all necessary actions to reserve/unreserve a particular die
   * Adds "reserved" as a class label to indicate a die is reserved
   * Removes "reserved" a class label if a die is already reserved
   *
   * @param {Object} event the <img> element representing the die to reserve
   */
  reserve(event) {
      console.log(event.target.getAttribute("src"));
      if(event.target.getAttribute("src") != "images/blank.svg"){


      if(event.target.getAttribute("class") != "reserved"){
       event.target.classList.toggle("reserved");
      }else{
        event.target.classList.toggle("die");
      }

    }

  }//reserve()

  /**
   * Sets die picture to a specific roll value, including blank or spinning
   * Private- Internal use in dice.js only
   * Updates both the picture of the die and its integer value in diceArray
   *
   * @param {Object} element the <img> element representing the die to set
   * @param {int} newValue the new value of the die: 0 for blank or 1 - 6
   */
  #setDie(element, newValue) {
      element.src = "images/" + this.#diceLabels[newValue] + ".svg";
      this.#diceArray[element.getAttribute("id")[4]] = newValue;


  }//setDie()
  /**
   * A useful testing method to conveniently change dice
   * Repeatedly calls this.#setDie
   *
   * @param {Array} newDiceArray an array of integers
   */
  setDice(newDiceArray){
    for(let i in newDiceArray){
      this.#setDie(document.getElementById("die-" + i), newDiceArray[i]);
    }
  }

}//Dice class

export default Dice;
