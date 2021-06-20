import React from 'react';
import { Card, Typography } from '@material-ui/core';
import { TouchableOpacity, View } from 'react-native';
import DrawerIcon from './DrawerIcon';
import { currentTheme } from '../../theme/Colours';

////////////////////////////////////////////////
// Props
////////////////////////////////////////////////
interface Props {
  name : string;
  buttonNav : () => void;
  closeDrawer : () => void;
};

////////////////////////////////////////////////
// Component
////////////////////////////////////////////////

/**
 * Returns a Button for the Drawer
 * @param props - see props above
 * @returns a Singular button with an icon and text that redirects the user to a certain page.
 */
const DrawerButton = (props : Props) => {

  return (
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
  );
}

export default DrawerButton;