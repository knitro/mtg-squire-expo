import React from 'react';
import { View } from 'react-native';
import { FirebaseContext } from '../../../Firebase';
import LoginForm from '../DisplayComponent/LoginForm'

const Login = () => {

  return (
    
    <View>

      <FirebaseContext.Consumer>
        {firebase => <LoginForm firebase={firebase}/>}
      </FirebaseContext.Consumer>

    </View>
  );
}

export default Login;