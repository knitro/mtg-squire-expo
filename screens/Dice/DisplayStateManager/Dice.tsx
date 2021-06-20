////////////////////////
/*Imports*/
////////////////////////

import React from 'react';
import { DiceHistoryState, getDiceHistory, clearDiceHistory } from '../../../states/DiceHistoryState';
import { getSettings } from '../../../states/SettingsState';
import DiceComponent from '../DisplayComponent/DiceComponent';

////////////////////////
/*Interface*/
////////////////////////

/**
 * Interface of storage used to communicate between Dice and DiceComponent
 */
export interface DiceState {
  currentDiceHistoryState: DiceHistoryState[]; //Array of dice histories
  maxHistoryNumber : number;                   //Max number of dice history stored
};

////////////////////////
/*DisplayStateManager: Dice Class*/
////////////////////////

class Dice extends React.Component<{}, DiceState> {

  maxHistoryNumber : number;

  ////////////////////////
  /*Constructor*/
  ////////////////////////

  constructor(props : any) {
    super(props);
    this.state = {
      currentDiceHistoryState: [],
      maxHistoryNumber: 0,
    }
    this.maxHistoryNumber = 0;
  }

  ////////////////////////
  /*Methods*/
  ////////////////////////

  /**
   * Updates the Components when async results.
   */
  async componentDidMount() {

    let retrievedMaxHistoryNumber : number = (await getSettings()).diceStored;

    this.setState({
      currentDiceHistoryState: await getDiceHistory(),
      maxHistoryNumber: retrievedMaxHistoryNumber
    });
    this.maxHistoryNumber = retrievedMaxHistoryNumber;
  }

  /**
   * Update stored dice history value from storage
   */
  updateDiceHistory() {
    getDiceHistory().then(e => {
      this.setState({currentDiceHistoryState : e, maxHistoryNumber: this.maxHistoryNumber});
    });
  }

  /**
   * Clear dice history from storage and from display
   */
  clearDiceHistory() {
    clearDiceHistory().then(() => {
      this.setState({currentDiceHistoryState : [], maxHistoryNumber: this.maxHistoryNumber});
    });
  }

  ////////////////////////
  /*Render*/
  ////////////////////////

  render() {
    return (
      <DiceComponent state={this.state} main={this}/>
    );
  }

}

export default Dice;