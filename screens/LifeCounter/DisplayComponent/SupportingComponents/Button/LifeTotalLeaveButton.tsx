import React from 'react';
import { PlayersContextProvider, PlayersContextConsumer, Players } from '../../../../../states/LifeCounterPlayerState';
import { Actions } from 'react-native-router-flux';
import { Fab } from '@material-ui/core';
import ReturnIcon from '../../../../../components/Icons/ReturnIcon';
import { Dimensions } from 'react-native';

/**
 * Button for leaving life counter page
 */
const LifeTotalLeaveButton = () => {
    return (
      <PlayersContextProvider>
      <PlayersContextConsumer>
        {(context : Players) => (
          (context.players.length === 1) ? // if 1 player
            <LifeTotalLeaveButtonOnePlayer/>
          : (context.players.length === 3) ? //if 3 players
            <LifeTotalLeaveButtonThreePlayer/>
          :  // if 2 OR 4 players
            <LifeTotalLeaveButtonTwoPlayer/>
        )}
      </PlayersContextConsumer>
      </PlayersContextProvider>
    )
}

/**
 * Leave life counter button for one player
 */
const LifeTotalLeaveButtonOnePlayer = () => {
  return (
    <Fab color="primary" aria-label="add"
      onClick={e => {
        Actions.lifeCounter();
      }}
    style={{
      alignSelf:'center',
      position: 'absolute',
      width:70,
      height:70,  
    }}
    >
      <ReturnIcon/>
    </Fab>
  )
}

/**
 * Leave life counter button for two OR four players
 */
const LifeTotalLeaveButtonTwoPlayer = () => {
  const h = Dimensions.get('window').height;

  return (
    <Fab color="primary" aria-label="add"
      onClick={e => {
        Actions.lifeCounter();
      }}
    style={{
      alignSelf:'center',
      justifySelf:'center',
      position: 'absolute',       
      width:70,
      height:70,  
      top: h/2 - 35,
    }}
    >
      <ReturnIcon/>
    </Fab>
  )
}

/**
 * Leave life counter button for three players
 */
const LifeTotalLeaveButtonThreePlayer = () => {
  const h = Dimensions.get('window').height;

  return (
    <Fab color="primary" aria-label="add"
      onClick={e => {
        Actions.lifeCounter();
      }}
    style={{
      alignSelf:'center',
      justifySelf:'center',
      position: 'absolute',       
      width:70,
      height:70,  
      top: h/3 - 35,
    }}
    >
      <ReturnIcon/>
    </Fab>
  )
}

export default LifeTotalLeaveButton;