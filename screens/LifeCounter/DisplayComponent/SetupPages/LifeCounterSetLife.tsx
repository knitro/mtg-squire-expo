import React from 'react';
import Overlay from '../../../../components/Overlay/Overlay';
import { GameContextConsumer, Game, saveGame, GameContextProvider } from '../../../../states/LifeCounterSetupState';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { Button, TextInput, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

const LifeCounterSetLife: React.FC = () => {

  var customLife : number = 0;

  return (

    <View>
      <GameContextProvider>
        
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
              onPress={() => {}}
              title={"Starting Life Totals"}
              disabled
            />
            <Button
              onPress={() => {Actions.lifeCounterConfirm();}}
              title={"Confirmation"}
              
            />
          </View>
        </Card>

        <Card>
          <CardHeader title={"Starting Life Total"}/>
          <CardContent>

          <GameContextConsumer>
            {(context : Game) => (
          <View>
              {/* Button 1 - 20 Life */}
              <View style={{padding: 5 }}>
                <Button 
                  onPress={() => {
                    context != null ? //gives default for other setup values if nothing saved
                    saveGame({lifeTotal: 20, numberPlayers : context.numberPlayers}) :
                    saveGame({lifeTotal: 20, numberPlayers : 2});
                    Actions.lifeCounterConfirm();
                  }}
                  title={"20"}
                />
              </View>

              {/* Button 2 - 30 Life */}
              <View style={{padding: 5 }}>
                <Button
                  onPress={e => {
                    context != null ? //gives default for other setup values if nothing saved
                    saveGame({lifeTotal: 30, numberPlayers : context.numberPlayers}) :
                    saveGame({lifeTotal: 30, numberPlayers : 4});
                    Actions.lifeCounterConfirm();
                  }}
                  title={"30"}
                />
              </View>

              {/* Button 3 - 40 Life */}
              <View style={{padding: 5 }}>
                <Button
                  onPress={e => {
                    context != null ? //gives default for other setup values if nothing saved
                    saveGame({lifeTotal: 40, numberPlayers : context.numberPlayers}) :
                    saveGame({lifeTotal: 40, numberPlayers : 4});
                    Actions.lifeCounterConfirm();
                  }}
                  title={"40"}
                />
              </View>

              {/* Button 4 - Custom Number Life */}
              <View style={{padding: 5, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput
                  placeholder="Custom" keyboardType="number-pad"                
                  style={{width:5000, backgroundColor:'#E3F2FD'}}
                  onChangeText={(t) => {
                    customLife = Math.ceil(Number(t))
                  }}/>  
                <Button
                onPress={e => {
                  context != null ? //gives default for other setup values if nothing saved
                  saveGame({lifeTotal: customLife, numberPlayers : context.numberPlayers}) :
                  saveGame({lifeTotal: customLife, numberPlayers : 4});
                  Actions.lifeCounterConfirm();
                }}
                title={"   Use Custom Life value   "}
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

export default LifeCounterSetLife;