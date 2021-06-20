import React from 'react';
import HelpCard from './SupportingComponents/HelpCard';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import Overlay from '../../../components/Overlay/Overlay';

const Help: React.FC = () => {

  return (
    <View style={{flex:1}}>

      <Overlay headerLabel="Help" />

      <ScrollView> 
        <HelpCard
          title = "Quick Search"
          text = "Quick Search finds the single card with the closest name to the given input."
          buttonNav = {() => Actions.quickSearch()}
          buttonText = "Go to Quick Search"
        />
        <HelpCard
          title = "Advanced Search"
          text = "The Advanced Search page allows you to input multiple variables to find a list of multiple possible cards which meet the given specifications."
          buttonNav = {() => Actions.advancedSearch()}
          buttonText = "Go to Advanced Search"
        />
        <HelpCard
          title = "Card Pages"
          text = {"When a card is found from either search method, it is displayed on its unique card page. "
            +"The main screen displays the card itself, along with its oracle text and additional rulings. "
            +"This page also has side screens which can be found by swipe to the sides. "
            +"These side screens include other useful information such as other printings, pricings and format legalities."}
          buttonNav = {()=>{}}
          buttonText = ""
        />
        <HelpCard
          title = "Dice"
          text = "The dice page gives you the ability to roll the commonly requried dice at a moments notice. It also has functionaltiy to do custom die rolls and displays most recent previous roles."          
          buttonNav = {() => Actions.dice()}
          buttonText = "Go to Dice page"
        />
        <HelpCard
          title = "Life Counter"
          text = {"The Life Counter pages allow you to display life for up to four players! "
            + "During set up, you are given options to set the number of players and starting life totals of the players. "
            + "The Life Counters are displayed as large buttons which can be pressed (high or low) to add or remove from the life counter. "
            + "Each individual life counter can be swiped to the side to display extra counters which can be used to mana, commander damage or other possible player based counters which may be requried. "
            + "Life Counter information is stored until you start another game so you can leave the section of the application without worry."}
          buttonNav = {() => Actions.lifeCounter()}
          buttonText = "Go to Life Counter"
        />
        <HelpCard
          title = "Search History"
          text = "Shows a list of your most recent previous searches to allow easy access to those searches."
          buttonNav = {() => Actions.searchHistory()}
          buttonText = "Go to Search History"
        />
        <HelpCard
          title = "Wishlist"
          text = "Allows the users to log in, and see their items on their wishlist, added from the ResultsDisplay"
          buttonNav = {() => Actions.wishlist()}
          buttonText = "Go to Wishlist page"
        />
        <HelpCard
          title = "Settings"
          text = "The settings page has multiple options to alter how the application works or how information is stored. More settings may be added in later versions."
          buttonNav = {() => Actions.settings()}
          buttonText = "Go to Settings page"
        />
        <HelpCard
          title = "Other Pages for later versions"
          text = "Other functionalities including a Trading Cards page, Rules and Set EVs may be added in later versions of the application."
          buttonNav = {()=>{}}
          buttonText = ""
        />
      </ScrollView>
    </View>

  );
};

export default Help;
