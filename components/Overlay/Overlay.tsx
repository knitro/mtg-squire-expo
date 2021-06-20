import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons }  from '@expo/vector-icons';
import { currentTheme } from '../../theme/Colours';
import { Drawer } from '@material-ui/core';
import DrawerContent from '../Drawer/Drawer';

/**
 * Props for the Overlays Component.
 */
interface OverlayProps {
  headerLabel : string //The header label for the header
}

/*Constants Initialisation*/
const menuSize : number = 22;

/**
 * Creates the Overlays for the App.
 * @param props - takes in parameters (currently only a string to display on the header).
 */
const Overlay: React.FC<OverlayProps> = (props) => {
  
  /*Hook Initialisation*/
  const [drawerOpen, toggleDrawerOpen] = useState(false); //Toggles the Overlay's Sidemenu Drawer

  /*Return*/
  return (

    <View>

      {/*Creates the Header Component. Styles creates the rectangle box*/}
      <View style={OverlayStyles.header}>

        {/*Creates the Hamburger Icon + Label*/}
        <MaterialIcons name='menu' size={menuSize} onPress={() => toggleDrawerOpen(!drawerOpen)} style={OverlayStyles.icon} />
        <Text style={OverlayStyles.headerText}>{props.headerLabel}</Text>

      </View>

      {/*Creates the Drawer*/}
      <Drawer 
        anchor={"left"} 
        open={drawerOpen}
        onClose={() => toggleDrawerOpen(false)} 
        style={{width:200}}
      >
        <DrawerContent closeDrawer={() => toggleDrawerOpen(false)}/>
      </Drawer>
      
    </View>
  );
};

/**
 * StyleSheet for the Overlays
 */
const OverlayStyles = StyleSheet.create({
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