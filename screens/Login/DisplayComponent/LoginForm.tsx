import { Card, CardContent, CardHeader, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { ActivityIndicator, Alert, Button, View } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import Firebase from '../../../Firebase';
import Overlay from '../../../components/Overlay/Overlay';
import { CardStyle, CardTextStyle } from '../../../styles/CardStyle';
import { currentTheme } from '../../../theme/Colours';
import { LoginInfo, submitLoginButtonPress } from '../Logic/LoginLogic';

interface LoginProps {
  firebase : Firebase
}

const LoginForm : React.FC<LoginProps> = (props: LoginProps) => {

  /*Hook Initialisation*/
  const [email,           setEmail]           = React.useState("");
  const [password,        setPassword]        = React.useState("");
  const [showLoading,     setShowLoading]     = React.useState(false);

  /*Style Initialisation*/
  const cardStyle = CardStyle();
  const cardTextStyle = CardTextStyle();

  /*Error Alert Initialisation*/
  const createErrorAlert = (input : string) => {
    Alert.alert(
      "ERROR",
      input,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  }

  //////////////////////////////
  /*Render Return*/
  //////////////////////////////

  return (

    <View style={{flex:1}}>

      <Overlay headerLabel={"Login"} />

      <ScrollView>

        {/* Card 1:  Login Header*/}
        <Card className={cardStyle.header}>
          <CardHeader title={"Login"} subheader={"Login into your MTG Squire Account"} />
        </Card>

        {/* Card 2:  Form Card*/}
        <Card className={cardStyle.normal}>
          <CardHeader title={"Login Details"} subheader={"Authenticate below"} />
          
          <CardContent>

            {/*Email Address Form*/}
            <Typography className={cardTextStyle.label}>{"Email Address"}</Typography>
            <TextField 
              variant="outlined"
              margin="normal"
              label="Email Address"
              autoComplete="off"
              placeholder={"Your Email Here"}
              value={email} 
              onChange={(event : any) => {setEmail(event.target.value);}}
              fullWidth
            />

            {/*Password Form*/}
            <Typography className={cardTextStyle.label}>{"Password"}</Typography>
            <TextField 
              variant="outlined"
              margin="normal"
              label="Password"
              placeholder={"Your Password Here"}
              value={password} 
              onChange={(event : any) => {setPassword(event.target.value);}}
              fullWidth
              type="password"
              autoComplete="current-password"
            />

          </CardContent>
        </Card>

        {/* Card 3: Login Button*/}
        <Card>
          <Button 
            color={currentTheme.primary.tint}
            title="Login"
            onPress={(event) => {
              let suppliedInfo : LoginInfo = {
                email           : email,
                password        : password,
              }
              submitLoginButtonPress(suppliedInfo, props.firebase, event, setShowLoading, createErrorAlert);
            }}
          />
        </Card>
        
        {/* Card 4:  Sign Up Header*/}
        <Card className={cardStyle.header}>
          <CardHeader title={"Sign Up!"} subheader={"Press the button below if you don't have a MTG Squire Account"} />
        </Card>
        
        {/* Card 5:  SignUp Button*/}
        <Card>
          {/*Search Button*/}
          <Button 
            color={currentTheme.primary.tint}
            title="Sign Up"
            onPress={() => {
              Actions.signUp();
            }}
          />
        </Card>
      

      </ScrollView>

      {/*Loading Popup*/}
      <ActivityIndicator
        animating={showLoading}
      />
      
    </View>
  );
}

export default LoginForm;