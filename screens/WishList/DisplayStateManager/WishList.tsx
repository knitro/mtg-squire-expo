import React from 'react';
import { FirebaseContext } from '../../../Firebase';
import { cacheLoginState } from '../../../states/LoginState';
import Login from '../../Login/DisplayStateManager/Login';
import WishListComponent from '../DisplayComponent/WishListComponent';

const WishList: React.FC = () => {

  console.log(cacheLoginState);

  if (cacheLoginState.authUser !== null) {
    return (
      <FirebaseContext.Consumer>
        {firebase => <WishListComponent firebase={firebase}/>}
      </FirebaseContext.Consumer>
    );
  } else {
    return (
      <Login />
    );
    
  }
  
}

export default WishList;
