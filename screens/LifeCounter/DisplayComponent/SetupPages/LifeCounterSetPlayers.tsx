import React from 'react';
import Overlay from '../../../../components/Overlay/Overlay';
import { GameContextConsumer, Game, saveGame, GameContextProvider } from '../../../../states/LifeCounterSetupState';
import { Button, View } from 'react-native';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { Actions } from 'react-native-router-flux';


const LifeCounterSetPlayers: React.FC = () => {

  return (

    <View>
      <GameContextProvider>
        
      {/* Displays the Header */}
      <Overlay headerLabel="Life Counter - New Game"/>

      <View>

      <Card>
          <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 5 }}>
            <Button
              onPress={() => {}}
              title={"Number of Players"}
              disabled
            />
            <Button
              onPress={() => {Actions.lifeCounterSetLife();}}
              title={"Starting Life Totals"}
            />
            <Button
              onPress={() => {Actions.lifeCounterConfirm();}}
              title={"Confirmation"}
              
            />
          </View>
        </Card>

        <Card>
          <CardHeader title={"Number of Players"}/>
          <CardContent>

          <GameContextConsumer>
            {(context : Game) => (
          <View>
            {/* Button 1 - 1 Player */}
            <View style={{padding: 5 }}>
                <Button
                onPress={e => {
                  context != null ? //gives default for other setup values if nothing saved
                  saveGame({lifeTotal: context.lifeTotal, numberPlayers : 1}) :
                  saveGame({lifeTotal: 20, numberPlayers : 1});
                  Actions.lifeCounterSetLife();
                }}
                title={"1"}
                />
              </View>

              {/* Button 2 - 2 Player */}
              <View style={{padding: 5 }}>
                <Button
                  onPress={e => {
                    context != null ? //gives default for other setup values if nothing saved
                    saveGame({lifeTotal: context.lifeTotal, numberPlayers : 2}) :
                    saveGame({lifeTotal: 20, numberPlayers : 2});
                    Actions.lifeCounterSetLife();
                  }}
                  title={"2"}
                />
              </View>

              {/* Button 3 - 3 Player */}
              <View style={{padding: 5 }}>
                <Button
                  onPress={e => {
                    context != null ? //gives default for other setup values if nothing saved
                    saveGame({lifeTotal: context.lifeTotal, numberPlayers : 3}) :
                    saveGame({lifeTotal: 40, numberPlayers : 3});
                    Actions.lifeCounterSetLife();
                  }}
                  title={"3"}
                />
              </View>

              {/* Button 4 - 4 Player */}
              <View style={{padding: 5 }}>
                <Button
                  onPress={e => {
                    context != null ? //gives default for other setup values if nothing saved
                    saveGame({lifeTotal: context.lifeTotal, numberPlayers : 4}) :
                    saveGame({lifeTotal: 40, numberPlayers : 4});
                    Actions.lifeCounterSetLife();
                  }}
                  title={"4"}
                />
              </View>

          </View>
            )}
          </GameContextConsumer>
          </CardContent>
        </Card>

      </View>

    </GameContextProvider>
    </View>
  );
};

export default LifeCounterSetPlayers;
