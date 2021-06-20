import React, { useState } from 'react';
import Overlay from '../../../components/Overlay/Overlay';
import { SettingsState } from '../../../states/SettingsState';
import Settings from '../DisplayStateManager/Settings';
import { Button, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Card, CardContent, CardHeader, MenuItem, Select } from '@material-ui/core';

/**
 * Interface for input of SettingsDisplayComponent
 */
interface SettingsComponentProps {
  state : SettingsState;
  main : Settings;
};

/**
 * Display Component used by Settings
 * @param props - inputs for component of state and main Settings class
 */
const SettingsDisplayComponent = (props : SettingsComponentProps) => {

    /*Variable Initialisation*/
    let state : SettingsState = props.state;
    let settingsClass : Settings = props.main;

    /*Hook Initialisation*/
    const [searchStored, setSearchStored]   = useState(1);
    const [diceStored, setDiceStored]   = useState(1);

  return (
    
    <View>

      {/* Displays the Header */}
      <Overlay headerLabel="Settings"/>

      <ScrollView>
        {/* Card 1 : Card Searches Stored */}
        <Card>

          <CardHeader
            title={"Number of Previous Searches Stored:"}
            subheader={"Current Value: " + state.searchStored}
          />

          <CardContent>
            <View style={{ flexDirection: 'row' }}>
              <TextInput 
                style={{ fontSize:20 }}
                placeholder="New Value" 
                keyboardType="number-pad"
                onChangeText={(t) => {
                  setSearchStored(Number(t));
                }}/>  
              <Button
              onPress={() => {
                settingsClass.updateSettingsValue('searchStored',searchStored);
              }}
              title={"Save"}
              />
            </View>
          </CardContent>

        </Card>

        {/* Card 2 : Dice Rolls Stored */}
        <Card>

          <CardHeader
            title={"Number of Previous Dice Rolls Stored:"}
            subheader={"Current Value: " + state.diceStored}
          />

          <CardContent>
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                style={{ fontSize:20 }}
                placeholder="New Value" 
                keyboardType="number-pad"
                onChangeText={(t) => {
                  setDiceStored(Number(t));
                }}/>  
              <Button
              onPress={() => {
                settingsClass.updateSettingsValue('diceStored',diceStored);
              }}
              title={"Save"}
              />
            </View>
          </CardContent>

        </Card>

        {/* Card 3 : Currency */}
        <Card>            
          <CardHeader
            title={"Change Currency"}
            subheader={"Current Value: " + state.currency}
          />
          
          <CardContent>
            <Select
              value={state.currency}
              onChange={e => {
                settingsClass.updateSettingsValueCurrency(String(e.target.value))}}
            >
              <MenuItem value="AUD">AUD</MenuItem>
              <MenuItem value="BGN">BGN</MenuItem>
              <MenuItem value="BRL">BRL</MenuItem>
              <MenuItem value="CAD">CAD</MenuItem>
              <MenuItem value="CHF">CHF</MenuItem>
              <MenuItem value="CNY">CNY</MenuItem>
              <MenuItem value="CZK">CZK</MenuItem>
              <MenuItem value="DKK">DKK</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="GBP">GBP</MenuItem>
              <MenuItem value="HKD">HKD</MenuItem>
              <MenuItem value="HRK">HRK</MenuItem>
              <MenuItem value="HUF">HUF</MenuItem>
              <MenuItem value="IDR">IDR</MenuItem>
              <MenuItem value="ILS">ILS</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="ISK">ISK</MenuItem>
              <MenuItem value="JPY">JPY</MenuItem>
              <MenuItem value="KRW">KRW</MenuItem>
              <MenuItem value="MXN">MXN</MenuItem>
              <MenuItem value="MYR">MYR</MenuItem>
              <MenuItem value="NOK">NOK</MenuItem>
              <MenuItem value="NZD">NZD</MenuItem>
              <MenuItem value="PHP">PHP</MenuItem>
              <MenuItem value="PLN">PLN</MenuItem>
              <MenuItem value="RON">RON</MenuItem>
              <MenuItem value="RUB">RUB</MenuItem>
              <MenuItem value="SEK">SEK</MenuItem>
              <MenuItem value="SGD">SGD</MenuItem>
              <MenuItem value="THB">THB</MenuItem>
              <MenuItem value="TRY">TRY</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="ZAR">ZAR</MenuItem>
            </Select>
          </CardContent>

        </Card>
      </ScrollView>
      
    </View>
  );
};

export default SettingsDisplayComponent;