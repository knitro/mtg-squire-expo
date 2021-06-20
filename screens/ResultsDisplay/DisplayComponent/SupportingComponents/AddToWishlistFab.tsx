import { Fab } from '@material-ui/core';
import React from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Firebase from '../../../../components/Firebase';
import AddIcon from '../../../../components/Icons/AddIcon';
import { SearchState } from '../../../../states/SearchState';
import { WishListData } from '../../../../states/WishListData';

interface LoginProps {
  firebase : Firebase
  search : SearchState
}

const AddToWishlistFab : React.FC<LoginProps> = (props: LoginProps) => {

  return (
    <Fab 
      color="primary" 
      aria-label="add"
      onClick={() => { 
        //Check if there is an authenticated user or not
        if (props.firebase.auth.currentUser !== null) {

          //Get the Database Once
          props.firebase.db.ref('wishlist/' + props.firebase.auth.currentUser?.displayName).once("value", snapshot => {

            //If an existing value (card/s) are in the database
            if (snapshot && snapshot.exists()) {

              console.log("Existing Cards in Wishlist");

              let currentWishListData : WishListData = snapshot.val() as WishListData;
              currentWishListData.cards.push(props.search);
              props.firebase.db.ref('wishlist/' + props.firebase.auth.currentUser?.displayName)
              .set({
                "cards": currentWishListData.cards, 
              });
            } else { //Otherwise create a new entry
            
              console.log("No Existing Cards in Wishlist");

              props.firebase.db.ref('wishlist/' + props.firebase.auth.currentUser?.displayName)
              .set({
                "cards": [props.search], 
              });
            }
          });
          console.log("Added Card to Wishlist");
        } else {
          //No Authentication ==> Go to Login Screen
          Actions.login();
        }
        
      }}
      style={{
        alignSelf:'flex-end',
        position: 'absolute',
        width: 50,
        height:50,
        margin: 5,  
      }}
    >
      <AddIcon/>
    </Fab>
  );
}

export default AddToWishlistFab;

