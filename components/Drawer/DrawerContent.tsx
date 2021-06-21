import { Card, createStyles, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Theme } from 'react-navigation';
import { currentTheme } from '../../theme/Colours';
import CardIcon from '../Icons/CardIcon';
import DrawerButton from './DrawerButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

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

  ////////////////////////
  // Var Initialisation
  ////////////////////////

  closeDrawerFunction : () => void = this.props.closeDrawer;

  ////////////////////////
  // Render
  ////////////////////////

  render() {

    return (
      <List>

        {/* Buttons on the Drawer to Main Pages */}
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

      </List>
    );
  }
}

export default DrawerContent;
