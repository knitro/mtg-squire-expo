import React from 'react';
import { View } from 'react-native';
 
import { FirebaseContext } from '../../../Firebase';
import SignUpForm from '../DisplayComponent/SignUpForm';

const SignUp = () => {

  return (
    
    <View>

      <FirebaseContext.Consumer>
        {firebase => <SignUpForm firebase={firebase}/>}
      </FirebaseContext.Consumer>

    </View>
  );
}

export default SignUp;