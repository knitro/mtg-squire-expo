import { Card, CardContent, CardHeader, Fab, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { ActivityIndicator, Alert, ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Firebase from '../../../components/Firebase';
import LogoutIcon from '../../../components/Icons/LogoutIcon';
import Overlay from '../../../components/Overlay/Overlay';
import { CardStyle, CardTextStyle } from '../../../styles/CardStyle';
import {v4 as uuid} from 'uuid';
import { searchCallURI } from '../../../logic/dataManagerCall';
import { SearchState } from '../../../states/SearchState';
import { WishListData } from '../../../states/WishListData';

interface WishListProps {
  firebase : Firebase
}

const WishListComponent: React.FC<WishListProps> = (props : WishListProps) => {

  /*Hook Initialisation*/
  const [isCards, setIsCards] = useState(false);
  const [cards, setCards] = useState<SearchState[]>([]);
  const [showLoading, setShowLoading] = useState(false);

  /*Database Values Initialisation*/
  useEffect(() => {
    props.firebase.db.ref('wishlist/' + props.firebase.auth.currentUser?.displayName).on("value", snapshot => {
      console.log(snapshot);
      if (snapshot && snapshot.exists()) {
        console.log(snapshot.val());
        let currentWishListData : WishListData = snapshot.val() as WishListData;
        setCards(currentWishListData.cards);
        console.log(currentWishListData.cards);
        setIsCards(true);
        console.log("Call with Data");
        console.log(cards);
      } else {
        console.log("Call without Data");
        setIsCards(false);
      }
    });
  }, []);

  /*Alert Initialisation*/
  const createErrorAlert = () => {
    Alert.alert(
      "ERROR",
      "No Cards matching your criteria could be found! This is likely due to your search parameters being too restrictive. Try having less restrictions.",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  }

  /*Style Initialisation*/
  const cardStyle = CardStyle();
  const cardTextStyle = CardTextStyle();

  if (isCards) {
    return (
    
      <View style={{flex:1}}>
  
        {/* Displays the Header */}
        <Overlay headerLabel="Wishlist"/>
  
        <View style={{flex:1}}>
  
          <View style={{flex:1}}>
            <ScrollView>
              
              {/*Card 1: Header Card*/}
              <Card className={cardStyle.header}>
                <CardHeader title={"Wishlisted Cards"} subheader={"Logged in as: " + props.firebase.auth.currentUser?.email}></CardHeader>
              </Card>
  
              {/*Card 2: Wishlisted Cards*/}
              <View>
                {cards.map((currentCard : SearchState) => 
                  <Card 
                    className={cardStyle.normal} 
                    key={uuid()}
                    onClick={() => {
                      searchCallURI(currentCard.api_uri, setShowLoading, createErrorAlert);
                    }}
                  >
                    <CardHeader title={currentCard.cardName} subheader={currentCard.set.setName}/>
                    <CardContent>
                      <img src={currentCard.imageLink} alt={currentCard.imageLink} className={"cardImage"}/>
                    </CardContent>
                  </Card>
                )}
              </View>
              
  
              {/*Loading Popup*/}
              <ActivityIndicator
                animating={showLoading}
              />
  
            </ScrollView>
          </View>
          
          {/*Create the Logout Button*/}
          <Fab color="primary" aria-label="add"
            onClick={() => {
              props.firebase.doSignOut();
              Actions.login();
            }}
            style={{
              alignSelf:'flex-end',
              position: 'absolute',
              width: 50,
              height:50,
              margin: 5,  
            }}
          >
            <LogoutIcon/>
          </Fab>
  
        </View>
  
      </View>
    );
  } else {
    return(
      <View style={{flex:1}}>
    
        {/* Displays the Header */}
        <Overlay headerLabel="Wishlist"/>
  
        <View style={{flex:1}}>
  
          <View style={{flex:1}}>
            <ScrollView>
              
              {/*Card 1: Header Card*/}
              <Card className={cardStyle.header}>
                <CardHeader title={"Wishlisted Cards"} subheader={"Logged in as: " + props.firebase.auth.currentUser?.email}></CardHeader>
              </Card>
  
              {/*Card 2: No Cards in Wishlist*/}
              <Card 
                className={cardStyle.normal} 
              >
                <CardContent>
                  <Typography className={cardTextStyle.normal}>{"There are no cards in your wishlist! Add them on the Card Pages"}</Typography>
                </CardContent>
              </Card>
  
              {/*Loading Popup*/}
              <ActivityIndicator
                animating={showLoading}
              />
  
            </ScrollView>
          </View>
          
          {/*Create the Logout Button*/}
          <Fab color="primary" aria-label="add"
            onClick={() => {
              props.firebase.doSignOut();
              Actions.login();
            }}
            style={{
              alignSelf:'flex-end',
              position: 'absolute',
              width: 50,
              height:50,
              margin: 5,  
            }}
          >
            <LogoutIcon/>
          </Fab>
  
        </View>
    
      </View>
    );
  }
  
}

export default WishListComponent;
