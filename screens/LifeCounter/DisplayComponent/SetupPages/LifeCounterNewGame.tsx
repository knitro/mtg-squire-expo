import React from 'react';
import Overlay from '../../../../components/Overlay/Overlay';
import { PlayersContextConsumer, Players, PlayersContextProvider } from '../../../../states/LifeCounterPlayerState';
import { Button, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardHeader } from '@material-ui/core';


const LifeCounterNewGame: React.FC = () => {

  return (

    <View>

      {/* Displays the Header */}
      <Overlay headerLabel="Life Counter - New Game"/>

      <PlayersContextProvider>


      {/* Button 1 - Create new game */}
      <Card>
        <CardHeader title={"Start another Game"}/>

        <View style={{padding: 5 }}>
        <Button
        onPress={() => {
          // navigation.navigate('LifeCounterSetPlayers')
          Actions.lifeCounterSetPlayer();
        }}
        title={"New Game"}
        />
        </View>
      </Card>

      {/* Button 2 - Continue Game */}
      <Card>
        <CardHeader title={"Resume Previous Game"}/>

        <View style={{padding: 5 }}>
        <PlayersContextConsumer>
          {(context : Players) => (
            (context.players == null) // checks if have stored game
            ? <Button onPress={()=>{}} title={"Continue Game"} disabled/>
            : <Button onPress={()=>{Actions.lifeCounterPlay();}} title={"Continue Game"}/>
          )}
        </PlayersContextConsumer>
        </View>
      </Card>

      </PlayersContextProvider>
    </View>
  );
};

export default LifeCounterNewGame;
