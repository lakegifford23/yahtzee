class Scorecard {
  #totalElements;
  #categoryElements;
  #upperCategories;
  #lowerCategories;
  #scores;
  #totals;

  constructor(){
    this.#categoryElements = Array.from(document.getElementsByClassName("score"));
    this.#totalElements = Array.from(document.getElementsByClassName("total"));
    this.#upperCategories =['one', 'two', 'three', 'four', 'five', 'six'];
    this.#lowerCategories = ['3-of-a-kind', '4-of-a-kind', 'full-house', 'small-straight', 'large-straight', 'Yahtzee', 'chance'];
    this.#totals = ['upper-section-total', 'lower-total', 'upper-section-total-lower', 'grand-total', 'upper-bonus'];
    this.#scores = {};
    let array = this.#upperCategories.concat(this.#lowerCategories).concat(this.#totals);
    console.log(array.length);
    for(let i in this.#scores) {
      this.#scores[i] = -1;
    }
  }
  /**
   * Attempts to enter a score for a particular category
   * If a score is valid for a particular cateogry (using the given dice roll)
   *   the score is entered, totals are recalculated, and the category  is disabled.
   * If a score is invalid, the bad score is removed
   *
   * @param {Object} element the input element for a particular category
   * @param {Number} value the proposed score for the category
   * @param {Object} diceArray an array of integer values indicating the current roll
   * @return {Boolean} a Boolean value indicating whether the score is valid for the category
   */
  enterScore(element, value, diceArray){

    if(this.#validateScore(element.id, value, diceArray)){
      this.#scores[element.id] = value;
      element.disabled = true;
      this.#updateTotals();
      return true;
    }
  }

  getCategoryElements(){
    return this.#categoryElements;
  }

  /**
   * Determines whether the scorecard is full
   * A full scorecard is a scorecard where all categores are disabled.
   *
   * @return {Boolean} a Boolean value indicating whether the scorecard is full
   */
  isFull(){
      console.log(Object.keys(this.#scores).length);
      if(Object.keys(this.#scores).length >=19){
        return true;
      }
      return false;
  }

  /**
   * Resets the scorecard for a new game
   *   -Scores are removed from all caregories
   *   -No categories are disabled
   *
   */
  reset(){
      for(let i in this.#scores){
          document.getElementById(i).innerHTML = '';
          document.getElementById(i).value = '';
          document.getElementById(i).disabled = false
      }
  }

  /**
   * Loads scores from a JS object
   *
   * @param {Object} objectVersion the object version of the scorecard
   *
   */
  loadScores(objectVersion){
    for(let key in objectVersion){
      let x = document.getElementById(key)
      x.setAttribute("disabled", " ");
      x.value = objectVersion[key];
      this.#scores[key] = objectVersion[key];
      this.#updateTotals;
    }
  }

  /**
   * Creates a JS object from the scorecard
   *
   * @return {Object} an object version of the scorecard
   *
   */
  toObject(){
      let returnScore = this.#scores;
      return returnScore;
  }

  /**
   * Validates a score for a particular category
   *
   * @param {String} id the category id
   * @param {Number} value the proposed score for the category
   * @param {Object} diceArray an array of integer values indicating the current roll
   * @return {Boolean} a Boolean value indicating whether the score is valid for the category
   */
  #validateScore(id, value, diceArray){

if(value == ' ' || value == '' || value < 0 || isNaN(value)){
  return false;
}else if(diceArray[0] == 0){
  return false;
}
    let upperBool = false;
    let upperCheck = 0;
    let total = 0;
    let multiplesArray = [0,0,0,0,0,0];
//chance
  if(id == 'chance'){
    let x = diceArray.reduce((a, b) => a + b, 0);
    if(x==value){
      return true;
    }
  }
//upper score ?
    for(let i in this.#upperCategories){
      if(id == this.#upperCategories[i]){
        upperCheck = parseInt(i)+1;
        upperBool = true;
      }
    }
//calculates upper score
    if(upperBool){
      for(let i in diceArray){
        if(diceArray[i] == upperCheck){
          total+=parseInt(diceArray[i]);
        }
      }
//validates upper score
      if(total == value || value == 0){
        return true;
      }
      return false;

//lower score
    }else{
//calculates lower score
        for(let i in diceArray){
          for(let j in multiplesArray){
            if(diceArray[i] == parseInt(j)+1){
              multiplesArray[j] ++;
            }
          }
        }
//3 of a kind, 4, yahtzee
  let kindTotal = 0;
        for(let i = 0; i < multiplesArray.length; i++){
          kindTotal+= parseInt(multiplesArray[i])*(parseInt(i)+1);

        }
        if(id == '3-of-a-kind'){
          for(let i in multiplesArray){
            if (multiplesArray[i] >= 3 && value == kindTotal || value == 0){
              return true;
            }
          }
        }else if(id == '4-of-a-kind'){
          for(let i in multiplesArray){
            if (multiplesArray[i] >= 4 && value == kindTotal || value == 0){
              return true;
            }
          }
        }else if(id == 'Yahtzee'){
          for(let i in multiplesArray){
            if ((multiplesArray[i] == 5 && value == 50) || value == 0){
              return true;
            }
          }
          }
//full house
          if(id == 'full-house'){
            let threeTrue = false;
            let twoTrue = false;
            for(let i in multiplesArray){
              if (multiplesArray[i] == 3){
                threeTrue = true;
              }else if(multiplesArray[i] == 2){
                twoTrue = true;
              }
            }
            if((threeTrue && twoTrue && parseInt(value) == 25) || value == 0){
              return true;
            }
          }
//large straight
    if(id == 'large-straight'){
      for(let i = 0; i < 2; i++){
        if(multiplesArray[i] >= 1 && multiplesArray[i+1] >= 1 && multiplesArray[i+2] >= 1 && multiplesArray[i+3] >= 1 && multiplesArray[i+4] >= 1){
          if(value == 40){
          return true;
          }
        }else if(value == 0){
          return true;
        }
      }
    }
    if(id == 'small-straight'){
      for(let i = 0; i < 3; i++){
        if(multiplesArray[i] >= 1 && multiplesArray[i+1] >= 1 && multiplesArray[i+2] >= 1 && multiplesArray[i+3] >= 1){
          if(value == 30){
          return true;
          }
        }else if(value == 0){
          return true;
        }
      }
    }

        }

    return false;
// 'small-straight'
  }

  /**
   * Updates both the upper and lower totals
   *
   */
  #updateTotals(){

    this.#scores['upper-total'] = 0;
    this.#scores['lower-total'] = 0;
    this.#scores['upper-bonus'] = 0;

    for(let i in this.#upperCategories){
      if(this.#scores[this.#upperCategories[i]] !== undefined){

      this.#scores['upper-total'] += parseInt(this.#scores[this.#upperCategories[i]]);

     if(this.#scores['upper-total'] > 63){
          this.#scores['upper-bonus'] = 35;
      }
      console.log(parseInt(this.#scores[this.#upperCategories[i]]));
      this.#scores['upper-section-total-lower'] = this.#scores['upper-total'] + this.#scores['upper-bonus'];
      this.#scores['upper-section-total'] = this.#scores['upper-total'] + this.#scores['upper-bonus'];
      document.getElementById('upper-section-total').innerHTML = this.#scores['upper-section-total'];
      document.getElementById('upper-total').innerHTML = this.#scores['upper-total'];
      document.getElementById('upper-section-total-lower').innerHTML = this.#scores['upper-section-total-lower'];
      if(this.#scores['upper-total'] > 63){
      document.getElementById('upper-bonus').innerHTML = this.#scores['upper-bonus'];
    }else{
      document.getElementById('upper-bonus').innerHTML = '';
    }
    }
  }
    for(let i in this.#lowerCategories){
      if(this.#scores[this.#lowerCategories[i]] !== undefined){
      this.#scores['lower-total'] += parseInt(this.#scores[this.#lowerCategories[i]]);
      document.getElementById('lower-total').innerHTML = this.#scores['lower-total'];
    }
  }


  this.#scores['grand-total'] = this.#scores['upper-section-total'] + this.#scores['lower-total'];
  document.getElementById('grand-total').innerHTML = this.#scores['grand-total'];

  }

}//Scorecard class

export default Scorecard;
