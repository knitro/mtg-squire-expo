import React from 'react';
import LifeTotalOnePlayer from './SupportingComponents/LifeTotalOnePlayer';
import LifeTotalTwoPlayer from './SupportingComponents/LifeTotalTwoPlayer';
import LifeTotalThreePlayer from './SupportingComponents/LifeTotalThreePlayer';
import LifeTotalFourPlayer from './SupportingComponents/LifeTotalFourPlayer';
import LifeTotalLeaveButton from './SupportingComponents/Button/LifeTotalLeaveButton';
import { PlayersContextConsumer, Players, PlayersContextProvider } from '../../../states/LifeCounterPlayerState';
import { View } from 'react-native';

const LifeCounter: React.FC = () => {
  return (
    <View>
      <PlayersContextProvider>
      <PlayersContextConsumer>
          {(context : Players) => (
        (context.players.length === 4) ? // if 4 players
          <LifeTotalFourPlayer/>
        : (context.players.length === 3) ? //if 3 players
          <LifeTotalThreePlayer/>
        : (context.players.length === 2) ? // if 2 players
          <LifeTotalTwoPlayer/>
        : //if 1 player
          <LifeTotalOnePlayer/>
          
            // <View>
            // {/* <TouchableOpacity
            // style={{width: '80%', height: '50%', backgroundColor: 'red'  }}
            // //  onPress={onPress}
            // >
            // <Typography>Press Here</Typography>
            // </TouchableOpacity> */}
            //  {/* <View style={{flex: 1}}> */}
            // <View style={{width: '100%', height: '100%', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
            // <TouchableOpacity
            // style={{width: '100%', height: '100%', backgroundColor: 'green'  }}
            // //  onPress={onPress}
            // >
            // <Typography>Press Her 2e</Typography>
            // </TouchableOpacity>
            // </View>
            // {/* </View> */}
            // </View>
        )}
      </PlayersContextConsumer>
      </PlayersContextProvider>
      <LifeTotalLeaveButton/>
    </View>
  );
};

export default LifeCounter;
