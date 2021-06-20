import React from 'react';
import { updatePlayer, PlayersContextProvider, PlayersContextConsumer, Players } from "../../../../../states/LifeCounterPlayerState";
import { useState } from "react";
import { getChange, SubButtonProps, getSubValue, getSubColour } from '../../../Logic/SlidesHelper';
import { TouchableOpacity, View } from 'react-native';
import { Typography } from '@material-ui/core';


/**
 * Singular button of second page of slider
 * @param props - player, rotation, division and option of subscreen
 */
const SubScreenButton = (props : SubButtonProps ) => {
    const [life,setLife] = useState(0)
    
    const player = props.player;
    const rotation = props.rotation;
    const w = props.width;
    const h = props.height;  
    const option = props.option;

    return (

      <PlayersContextProvider>
        <PlayersContextConsumer>
          {(context : Players) => (

            <TouchableOpacity 
            style={{width: w, height: h, backgroundColor: getSubColour(option) }}
            // color={getSubColour(option)}
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
              await updatePlayer(context.players,player,getChange(rotation,pressValue,buttonSize,press),option);
              setLife(getSubValue(context,player,option))
            }}
            >
              <View style={{width: w, height: h, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{transform: [{ rotate: rotation+'deg' }]}}>
                  <Typography style={{color:'#222428', fontSize: 32}}>
                    {(
                        setLife(getSubValue(context,player,option)),
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

export default SubScreenButton;