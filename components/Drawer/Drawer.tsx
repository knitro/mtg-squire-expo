import { Card, Typography } from '@material-ui/core';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { currentTheme } from '../../theme/Colours';
import CardIcon from '../Icons/CardIcon';
import DrawerButton from './DrawerButton';

/**
 * Stylesheet for the Drawer
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'red',
  },
});

/**
 * Props for the Drawer Content.
 */
interface DrawerContentProps {
  closeDrawer : () => void
}

/**
 * Displays the Drawer/Sidemenu Content.
 */
class DrawerContent extends React.Component<DrawerContentProps> {

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
        <DrawerButton name={"Quick Search"}    buttonNav={() => Actions.quickSearch()}    closeDrawer={() => this.props.closeDrawer()}/>        
        <DrawerButton name={"Advanced Search"} buttonNav={() => Actions.advancedSearch()} closeDrawer={() => this.props.closeDrawer()}/>
        <DrawerButton name={"Dice"}            buttonNav={() => Actions.dice()}           closeDrawer={() => this.props.closeDrawer()}/>
        <DrawerButton name={"Life Tracker"}    buttonNav={() => Actions.lifeCounter()}    closeDrawer={() => this.props.closeDrawer()}/>
        <DrawerButton name={"Wishlist"}        buttonNav={() => Actions.wishlist()}       closeDrawer={() => this.props.closeDrawer()}/>
        <DrawerButton name={"Trade Cards"}     buttonNav={() => Actions.tradeCards()}     closeDrawer={() => this.props.closeDrawer()}/>
        <DrawerButton name={"Rules"}           buttonNav={() => Actions.rules()}          closeDrawer={() => this.props.closeDrawer()}/>
        <DrawerButton name={"Set EVs"}         buttonNav={() => Actions.setEVs()}         closeDrawer={() => this.props.closeDrawer()}/>
        <DrawerButton name={"Search History"}  buttonNav={() => Actions.searchHistory()}  closeDrawer={() => this.props.closeDrawer()}/>
        <DrawerButton name={"Settings"}        buttonNav={() => Actions.settings()}       closeDrawer={() => this.props.closeDrawer()}/>
        <DrawerButton name={"Help"}            buttonNav={() => Actions.help()}           closeDrawer={() => this.props.closeDrawer()}/>

        <DrawerButton name={"Back"}            buttonNav={() => {}}                       closeDrawer={() => this.props.closeDrawer()}/>

        {/* <Card>
          <TouchableOpacity     
            onPress={() => {
              Actions.advancedSearch();    
              this.props.closeDrawer()
            }} 
            style={{backgroundColor:'#add8e6'}}
          >
            <View style={{flexDirection: 'row', justifyContent: "flex-start", alignItems: "center", padding: 5 }}>
              <AdvancedSearchIcon/>
              <Typography style={{padding: 5}}>{"Advanced Search"}</Typography>
            </View>
          </TouchableOpacity>
        </Card> */}

        {/* <Button title={"Quick Search"}    onPress={() => {Actions.quickSearch();    this.props.closeDrawer()}} /> */}
        {/* <Button title={"Advanced Search"} onPress={() => {Actions.advancedSearch(); this.props.closeDrawer()}} /> */}
        {/* <Button title={"Dice"}            onPress={() => {Actions.dice();           this.props.closeDrawer()}} /> */}
        {/* <Button title={"Life Tracker"}    onPress={() => {Actions.lifeCounter();    this.props.closeDrawer()}} />
        <Button title={"Wishlist"}        onPress={() => {Actions.wishlist();       this.props.closeDrawer()}} />
        <Button title={"Trade Cards"}     onPress={() => {Actions.tradeCards();     this.props.closeDrawer()}} />
        <Button title={"Rules"}           onPress={() => {Actions.rules();          this.props.closeDrawer()}} />
        <Button title={"Set EVs"}         onPress={() => {Actions.setEvs();         this.props.closeDrawer()}} />
        <Button title={"Search History"}  onPress={() => {Actions.searchHistory();  this.props.closeDrawer()}} />
        <Button title={"Settings"}        onPress={() => {Actions.settings();       this.props.closeDrawer()}} />
        <Button title={"Help"}            onPress={() => {Actions.help();           this.props.closeDrawer()}} /> */}
        
        {/*Supporting Navigational Buttons*/}
        {/* <TouchableOpacity onPress={() => {Actions.quickSearch();    this.props.closeDrawer()}}><Typography>{"Quick Search Test"}</Typography></TouchableOpacity> */}
        {/* <Button title={"Back"}    onPress={() => {this.props.closeDrawer()}} /> */}
      </View>
    );
  }
}

export default DrawerContent;
