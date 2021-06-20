import React from 'react';
import { updatePlayer, PlayersContextProvider, PlayersContextConsumer, Players } from "../../../../../states/LifeCounterPlayerState";
import { useState } from "react";
import { ButtonProps, getColour, getChange } from '../../../Logic/SlidesHelper';
import { Typography } from '@material-ui/core';
import { TouchableOpacity, View } from 'react-native';


/**
 * First Screen Button displays the health of the user.
 * @param props - the settings of the button
 */
const FirstScreenButton = (props : ButtonProps) => {

  /*Variable Initialisation*/ 
  const player = props.player;
  const rotation = props.rotation;
  const w = props.width;
  const h = props.height;

  /*Hooks*/
  const [life, setLife] = useState(0)
  
  return (

    <PlayersContextProvider>
      <PlayersContextConsumer>
        {(context : Players) => (

        <TouchableOpacity
          style={{width: w, height: h, backgroundColor: getColour(player) }}
          onPress={async (e) => {
            //get press value of required rotation
            var pressValue, buttonSize = 0;
            var press : boolean = true; //TODO create setting 
            if (press) {
              pressValue = (rotation === 0 || rotation === 180) ? e.nativeEvent.locationY : e.nativeEvent.locationX;
              buttonSize = (rotation === 0 || rotation === 180) ? h : w  
            } else {
              pressValue = (rotation === 0 || rotation === 180) ? e.nativeEvent.locationX : e.nativeEvent.locationY;
              buttonSize = (rotation === 0 || rotation === 180) ? w : h  
            }
            //get change and update storage and hook
            await updatePlayer(context.players, player, getChange(rotation,pressValue,buttonSize,press), 'lifeTotal');
            setLife(context.players[player] == null ? 0 : context.players[player].lifeTotal)
          }}
        >
          <View style={{width: w, height: h, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{transform: [{ rotate: rotation+'deg' }]}}>
              <Typography style={{color:'white', fontSize:52}}>
                {(
                  setLife(context.players[player] == null ? 0 : context.players[player].lifeTotal),
                  life
                )}
              </Typography>
            </View>
          </View>
        </TouchableOpacity>

      )}
      </PlayersContextConsumer>
    </PlayersContextProvider>

  )
}

export default FirstScreenButton;