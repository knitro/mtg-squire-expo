import React, { useState } from 'react';
import Overlay from '../../../components/Overlay/Overlay';
import { rollCustom, flipCoin, rollD6, rollD20 } from '../Logic/DiceHelper';
import { DiceHistoryState } from '../../../states/DiceHistoryState';
import {v4 as uuid} from 'uuid';
import Dice, { DiceState } from '../DisplayStateManager/Dice';
import DiceDisplayCard from './SupportingComponents/DiceDisplayCard';
import { Button, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';

/**
 * Interface for input of DiceComponent
 */
interface DiceComponentProps {
  state : DiceState
  main : Dice
};

/**
 * Component used by Dice
 * @param props - inputs for component of state and main Dice class
 */
const DiceComponent = (props : DiceComponentProps) => {

  /*Variable Initialisation*/
  let diceHistory : DiceHistoryState[] = props.state.currentDiceHistoryState;
  let diceClass : Dice = props.main;
  let maxHistoryNumber : number = props.state.maxHistoryNumber;

  /*Hook Initialisation*/
  const [die, setDie]         = useState('Roll a Dice');
  const [dieType, setDieType] = useState('');
  const [custom, setCustom]   = useState(1 as number);

  /*Return*/
  return (
    
    <View>

      <View>
      {/* Displays the Header */}
      <Overlay headerLabel="Dice"/>

        <ScrollView>

          {/*Ion Card 1: Dice Display*/}
          <DiceDisplayCard dieValue={die} dieType={dieType} />

          {/*Ion Card 2: Dice Buttons*/}
          <Card>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 5 }}>
              {/*Coin Button*/}
              <Button
                onPress={e => {
                  setDie(flipCoin(maxHistoryNumber));
                  setDieType('Coin');
                  diceClass.updateDiceHistory();
                }}
                title={"Flip Coin"} 
              /> 

              {/*6 Sided Die Button*/}
              <Button
                onPress={e => {
                  setDie(rollD6(maxHistoryNumber).toString());
                  setDieType('6 Sided Die');
                  diceClass.updateDiceHistory();
                }}
                title={"Roll D6"} 
              />

              {/*20 Sided Die Button*/}
              <Button
                onPress={e => {
                  setDie(rollD20(maxHistoryNumber).toString());
                  setDieType('20 Sided Die');
                  diceClass.updateDiceHistory();
                }}
                title={"Roll D20"}
              />
            </View>

            <View
              style={{width:100}}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              {/*Custom Die Input Field*/}
              <TextInput
                style={{ fontSize:20 }}
                placeholder="Custom" keyboardType="number-pad"
                onChangeText={(t) => {
                  setCustom(Math.ceil(Number(t)));
              }}/>

              {/*Custom Die Button*/}
              <Button
              onPress={e => {
                setDie(rollCustom(custom, maxHistoryNumber));
                setDieType('Custom ('+ custom +' Sided) Die');
                diceClass.updateDiceHistory();
              }}
              title={"custom"}
              />
            </View>

          </Card>
          
          {/* IonCard 3: Dice History Header*/}
          <Card color="secondary">
            <CardHeader
              subheader={"Showing your previous " + diceHistory.length + " Rolls:"}
              title={"Dice History"}
            />
            <CardContent>
              <Button onPress={
                (e) => {
                  diceClass.clearDiceHistory();
                }}
                title={"Clear Dice History"}
              />
            </CardContent>
          </Card>
          
          {/* IonCards 4+: Dice History*/}
          <View>
            {[...diceHistory].reverse().map((currentPreviousRoll : DiceHistoryState) =>
              <Card key={uuid()}>
              <Typography>{currentPreviousRoll.dieValue}</Typography>

              <Typography>{currentPreviousRoll.dieType}</Typography>                      
              </Card>
            )}
          </View>

        </ScrollView>

      </View>
      
    </View>
  );
};

export default DiceComponent;