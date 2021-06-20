import React from 'react';
import { Card, CardHeader, Typography } from '@material-ui/core';
import { TouchableOpacity, View } from 'react-native';
import AdvancedSearchIcon from '../Icons/AdvancedSearchIcon';
import DrawerIcon from './DrawerIcon';
import { currentTheme } from '../../theme/Colours';

interface DrawerButtonProps {
  name : string;
  buttonNav : () => void;
  closeDrawer : () => void;
};

const DrawerButton = (props : DrawerButtonProps) => {

  return (
    <Card>
      <TouchableOpacity     
        onPress={() => {
          props.buttonNav();    
          props.closeDrawer()
        }} 
        style={{backgroundColor: currentTheme.secondary.main}}
      >
        <View style={{flexDirection: 'row', justifyContent: "flex-start", alignItems: "center", padding: 5 }}>
          <DrawerIcon name={props.name}/>
          <Typography style={{paddingLeft: 10, fontSize: 20, color: currentTheme.secondary.contrast }}>{props.name}</Typography>
        </View>
      </TouchableOpacity>
    </Card>
  );
}

export default DrawerButton;