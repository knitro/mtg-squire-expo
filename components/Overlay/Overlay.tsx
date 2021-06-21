import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons }  from '@expo/vector-icons';
import { currentTheme } from '../../theme/Colours';
import { Drawer, SwipeableDrawer } from '@material-ui/core';
import DrawerContent from '../Drawer/DrawerContent';

////////////////////////////////////////////////
// Props
////////////////////////////////////////////////
interface Props {
  headerLabel : string //The header label for the header
}

////////////////////////////////////////////////
// Supporting Variables
////////////////////////////////////////////////

const menuSize : number = 22;

////////////////////////////////////////////////
// Component
////////////////////////////////////////////////

/**
 * Creates the Overlays for the App.
 * @param props - takes in parameters (currently only a string to display on the header).
 */
const Overlay: React.FC<Props> = (props : Props) => {
  
  ////////////////////////
  // Var Initialisation
  ////////////////////////

  const [drawerOpen, toggleDrawerOpen] = useState(false); //Toggles the Overlay's Sidemenu Drawer

  /*Return*/
  return (

    <View>

      {/*Creates the Header Component. Styles creates the rectangle box*/}
      <View style={Style.header}>

        {/*Creates the Hamburger Icon + Label*/}
        <MaterialIcons name='menu' size={menuSize} onPress={() => toggleDrawerOpen(!drawerOpen)} style={Style.icon} />
        <Text style={Style.headerText}>{props.headerLabel}</Text>

      </View>

      {/*Creates the Drawer*/}
      <SwipeableDrawer  
        anchor={"left"} 
        open={drawerOpen}
        onOpen={() => toggleDrawerOpen(true)}
        onClose={() => toggleDrawerOpen(false)} 
        style={{width:200}}
      >
        <DrawerContent closeDrawer={() => toggleDrawerOpen(false)}/>
      </SwipeableDrawer >
      
    </View>
  );
};

////////////////////////////////////////////////
// Stylesheet
////////////////////////////////////////////////

const Style = StyleSheet.create({
  header: {
    width: '100%',
    height: '60px',
    flexDirection: 'row',
    alignItems: 'center', //Up + Down
    justifyContent: 'flex-start', //Left + Right
    backgroundColor: currentTheme.primary.main,
  },
  headerText: {
    fontSize: 22,
    color: currentTheme.primary.contrast,
    // letterSpacing: 1,
    paddingLeft: 3.5*menuSize, //2 for the Icon, 1.5 for the Padding
  },
  icon: {
    position: 'absolute',
    left: menuSize,
    color: currentTheme.primary.contrast,
  }
});

export default Overlay;