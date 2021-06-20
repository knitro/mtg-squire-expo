////////////////////////
/*Imports*/
////////////////////////

import { Players } from "../../../states/LifeCounterPlayerState";

////////////////////////
/*Interfaces*/
////////////////////////

/**
 * Interface used as input for life counts (buttons) on pages
 */
export interface ButtonProps {
  rotation : number; //which rotation the button is facing
  player : number;   //which player life total is for
  width : number;    //height of button
  height : number;   //width  of button
}

/**
 * Interface used as input for sub counts (sub section buttons) on pages
 */
export interface SubButtonProps {
  rotation : number; //which rotation the button is facing
  player : number;   //which player life total is for
  width : number;    //height of button
  height : number;   //width  of button
  option : string;   //which option is being updated
}

////////////////////////
/*Functions*/
////////////////////////

/**
 * Function which colour css class name from number 
 * @param p - player number to get css class name
 */
export function getColour(p : number){
  if(p === 0)
    return '#FF0000' // red
  else if(p === 1)
    return '#001f3d' // blue
  else if(p === 2)
    return '#0E6B0E' // green
  else
    return '#ffbe00' // yellow
}

/**
 * Function which colour css class name from sub button name 
 * @param c - sub life total value to get css class name
 */
export function getSubColour(c : string){
  if('valueW'.localeCompare(c) === 0)
    return '#FFFBD5'
  else if('valueU'.localeCompare(c) === 0)
    return '#ABE1FA'
  else if('valueB'.localeCompare(c) === 0)
    return '#91788F'
  else if('valueR'.localeCompare(c) === 0)
    return '#F9AC90'
  else if('valueG'.localeCompare(c) === 0)
    return '#9CD4B0'
  else //valueG
    return '#CDC3C1'
}

/**
 * Function to get css class name from rotation value for text. 
 * Also takes into account small or large text size
 * @param r - rotation of text
 * @param isSub - if text should be smaller than normal
 */
export function getTextClass(r : number,isSub : boolean){
  if(r === 0)
    return isSub ? "subtext0" : "text0"
  else if(r === 90)
    return isSub ? "subtext90" :"text90"
  else if(r === 180)
    return isSub ? "subtext180" :"text180"
  else 
    return isSub ? "subtext270" : "text270"
}

/**
 * Gets value of positive or negative 1 from where a button was pressed.
 * @param rotation - rotation of button
 * @param buttonSize - size (width/height) of button
 * @param pressValue - pressed value to compare against
 * @param orientationUpDown - orientation setting value
 */
export function getChange(rotation : number, pressValue : number, buttonSize : number, orientationUpDown : boolean) : number {
  if(orientationUpDown){
    if( pressValue > (buttonSize * 0.5) ){
      return ((rotation == 90 || rotation == 180) ? 1 : -1 );
    } else {
      return ((rotation ==  0 || rotation == 270) ? 1 : -1 );
    }
  } else {
    if( pressValue > (buttonSize * 0.5) ){
      return ((rotation ==   0 || rotation ==  90) ? 1 : -1 );
    } else {
      return ((rotation == 180 || rotation == 270) ? 1 : -1 );
    }
  }
  
}

/**
 * Gets value from mapping of a player. Needs player number and option of value.
 * @param players - database to get value from
 * @param p - player number of value
 * @param option - option of player which value is wanted
 */
export function getSubValue(players : Players, p : number, option : string) : number {
  if (players.players[p] == null){
    return 0;
  } else if ('valueW'.localeCompare(option) === 0){
    return players.players[p].valueW;
  } else if ('valueU'.localeCompare(option) === 0){
    return players.players[p].valueU;
  } else if ('valueB'.localeCompare(option) === 0){
    return players.players[p].valueB;
  } else if ('valueR'.localeCompare(option) === 0){
    return players.players[p].valueR;
  } else if ('valueG'.localeCompare(option) === 0){
    return players.players[p].valueG;
  } else if ('valueC'.localeCompare(option) === 0){
    return players.players[p].valueC;
  } else {
    return players.players[p].lifeTotal;
  }
}

/**
 * Gets sub button name based on input number. 
 * @param num - input number (between 0-5 inclusive)
 * @param isReverse - if rotation requries values given in reverse
 */
export function getSubName(num : number, isReverse : boolean) : string {
  //reverses value given
  if(isReverse){
    num = (5 - num);
  }

  //checks number to get value
  if(num === 0)
    return 'valueW'
  else if(num === 1)
    return 'valueU'
  else if(num === 2)
    return 'valueB'
  else if(num === 3)
    return 'valueR'
  else if(num === 4)
    return 'valueG'
  else 
    return 'valueC'
}