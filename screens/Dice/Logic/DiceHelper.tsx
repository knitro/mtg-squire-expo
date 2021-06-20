import { DiceHistoryState, saveDiceHistory } from "../../../states/DiceHistoryState";

/**
 * Simulates a coin flip
 * Giving random output of 2 possible values
 * @return string value of 'Heads' or 'Tails'
 */
export function flipCoin(maxHistoryNumber : number) : string {

  let result : string = (roll(2) > 1) ? 'Heads' : 'Tails';
  const diceResult : DiceHistoryState = {
    dieType: "Coin",
    dieValue: result
  };
  
  saveDiceHistory(diceResult, maxHistoryNumber);
    
  return result;
}

/**
 * Simulates rolling a six sided die
 * Gives random output possible of that die
 * @return number output of the die
 */
export function rollD6(maxHistoryNumber : number) : number {

  let result : number = roll(6);
  let resultString : string = result.toString();
  const diceResult : DiceHistoryState = {
    dieType: "D6",
    dieValue: resultString
  };
  
  saveDiceHistory(diceResult, maxHistoryNumber);

  return result;
}

/**
 * Simulates rolling a twenty sided die
 * Gives random output possible of that die
 * @return number output of the die
 */
export function rollD20(maxHistoryNumber : number) {

  let result : number = roll(20);
  let resultString : string = result.toString();
  const diceResult : DiceHistoryState = {
    dieType: "D20",
    dieValue: resultString
  };
  
  saveDiceHistory(diceResult, maxHistoryNumber);
  
  return result;
}

/**
 * Simulates rolling a die with custom number of sides
 * Gives random output possible of that die
 * Only handles positive (> 0) values of die
 * @param die number of sides on custom die
 * @return string output of the die or text if bad input
 */
export function rollCustom(die : number, maxHistoryNumber : number) : string {
  die = Math.ceil(die);
  if(die < 1){
    return 'please use a positive die value'
  }

  let result : number = roll(die);
  let resultString : string = result.toString();
  const diceResult : DiceHistoryState = {
    dieType: "D"+die,
    dieValue: resultString
  };
  
  saveDiceHistory(diceResult, maxHistoryNumber);
  return resultString;
}

/**
 * Rolls a die with given number of sides
 * Gives random output
 * @param numOfSides number of sides on die
 * @return die output (integer value) 
 */
function roll(numOfSides : number) : number {
  return Math.ceil(Math.random() * numOfSides);
}