import { Card, Typography } from '@material-ui/core';
import React from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { currentTheme } from '../../theme/Colours';
import CardIcon from '../Icons/CardIcon';
import DrawerButton from './DrawerButton';

////////////////////////////////////////////////
// Props
////////////////////////////////////////////////
interface Props {
  closeDrawer : () => void
}

////////////////////////////////////////////////
// Component
////////////////////////////////////////////////

/**
 * Displays the Drawer/Sidemenu Content.
 * @param props - See props above
 * @returns 
 */
class DrawerContent extends React.Component<Props> {

  closeDrawerFunction : () => void = this.props.closeDrawer;

  render() {
    return (
      <View style={{flex:1}}>
        {/*"Header" Image of the Drawer*/}
        <Card
          style={{width: 250, 
            background: currentTheme.primary.main,
        }}
        >
          <View style={{flexDirection: 'row', justifyContent: "flex-start", alignItems: "center", padding: 5 }}>
          <CardIcon/>
          <Typography 
            style={{paddingLeft: 10, fontSize: 32, color: currentTheme.primary.contrast }}
          >
            {"MTG Squire"}
          </Typography>
          </View>
        </Card>

        {/*Buttons on the Drawer to Main Pages*/}
        <DrawerButton name={"Quick Search"}    buttonNav={() => Actions.quickSearch()}    closeDrawer={this.closeDrawerFunction}/>        
        <DrawerButton name={"Advanced Search"} buttonNav={() => Actions.advancedSearch()} closeDrawer={this.closeDrawerFunction}/>
        <DrawerButton name={"Dice"}            buttonNav={() => Actions.dice()}           closeDrawer={this.closeDrawerFunction}/>
        <DrawerButton name={"Life Tracker"}    buttonNav={() => Actions.lifeCounter()}    closeDrawer={this.closeDrawerFunction}/>
        <DrawerButton name={"Wishlist"}        buttonNav={() => Actions.wishlist()}       closeDrawer={this.closeDrawerFunction}/>
        <DrawerButton name={"Trade Cards"}     buttonNav={() => Actions.tradeCards()}     closeDrawer={this.closeDrawerFunction}/>
        <DrawerButton name={"Rules"}           buttonNav={() => Actions.rules()}          closeDrawer={this.closeDrawerFunction}/>
        <DrawerButton name={"Set EVs"}         buttonNav={() => Actions.setEVs()}         closeDrawer={this.closeDrawerFunction}/>
        <DrawerButton name={"Search History"}  buttonNav={() => Actions.searchHistory()}  closeDrawer={this.closeDrawerFunction}/>
        <DrawerButton name={"Settings"}        buttonNav={() => Actions.settings()}       closeDrawer={this.closeDrawerFunction}/>
        <DrawerButton name={"Help"}            buttonNav={() => Actions.help()}           closeDrawer={this.closeDrawerFunction}/>

        <DrawerButton name={"Back"}            buttonNav={() => {}}                       closeDrawer={() => this.props.closeDrawer()}/>

      </View>
    );
  }
}

export default DrawerContent;
