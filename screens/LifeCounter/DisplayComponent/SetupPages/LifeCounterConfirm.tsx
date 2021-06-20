import React from 'react';
import Overlay from '../../../../components/Overlay/Overlay';
import { GameContextConsumer, Game, GameContextProvider } from '../../../../states/LifeCounterSetupState';
import { createPlayers, PlayersContextProvider } from '../../../../states/LifeCounterPlayerState';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { Button, View } from 'react-native';
import { Actions } from 'react-native-router-flux';


const LifeCounterConfirm: React.FC = () => {

  return (

    <View>
      <GameContextProvider><PlayersContextProvider>
      {/* Displays the Header */}
      <Overlay headerLabel="Life Counter - New Game"/>

      <View>

        <Card>

          <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 5 }}>
            <Button
              onPress={() => {Actions.lifeCounterSetPlayer();}}
              title={"Number of Players"}
            />
            <Button
              onPress={() => {Actions.lifeCounterSetLife();}}
              title={"Starting Life Totals"}
            />
            <Button
              onPress={() => {}}
              title={"Confirmation"}
              disabled
            />
          </View>

        </Card>
      
        <Card>
          <CardHeader title={"Confirm Options"}/>
          <CardContent>

          {/* Display of setup information */}
          <GameContextConsumer>
            {(context : Game) => (
          <View>

            <Typography>
              Number of players: {context.numberPlayers}
            </Typography>

            <Typography>
              Starting life: {context.lifeTotal}
            </Typography>

            <View style={{padding: 5 }}>
              <Button
                onPress={() => {
                  createPlayers(context);
                  Actions.lifeCounterPlay();
                }}
                title={"Start Game"}
              />
            </View>
            
          </View>
          )}
          </GameContextConsumer>
        
          </CardContent>
        </Card>

      </View>

      </PlayersContextProvider></GameContextProvider>
    </View>
  );
};

export default LifeCounterConfirm;
