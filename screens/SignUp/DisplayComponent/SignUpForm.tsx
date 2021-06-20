import { Card, CardContent, CardHeader, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { ActivityIndicator, Alert, Button, View } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import Firebase from '../../../Firebase';
import Overlay from '../../../components/Overlay/Overlay';
import { CardStyle, CardTextStyle } from '../../../styles/CardStyle';
import { currentTheme } from '../../../theme/Colours';
import { checkPasswordValidity, SignUpInfo, submitButtonPress } from '../Logic/SignUpLogic';

interface SignUpProps {
  firebase : Firebase
}

const SignUpForm : React.FC<SignUpProps> = (props: SignUpProps) => {

  /*Hook Initialisation*/
  const [username,        setUsername]        = React.useState("");
  const [email,           setEmail]           = React.useState("");
  const [password,        setPassword]        = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [showLoading,     setShowLoading]     = React.useState(false);

  /*Validity Hooks*/
  const [usernameValid, setUsernameValid]     = React.useState(false);
  const [emailValid,    setEmailValid]        = React.useState(false);
  const [passwordValid, setPasswordValid]     = React.useState(false);
  // const [buttonAvail,   setButtonAvail]       = React.useState(false);
  const [buttonAvail,   setButtonAvail]       = React.useState(true);

  /*Style Initialisation*/
  const cardStyle = CardStyle();
  const cardTextStyle = CardTextStyle();

  /*Error Alert Initialisation*/
  const createErrorAlert = () => {
    Alert.alert(
      "ERROR",
      "Sign Up has Failed. Please try again later.",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  }
  
  //////////////////////////////
  /*Hook Functions*/
  //////////////////////////////

  /**
   * Function Check for Button Availability.
   */
  const buttonCheckAvailability = () => {

    setButtonAvail(true);
    return;
    //Code below doesn't work due to delayed responses of the update hooks.
    // Functionality can be extended to implement this and have the button disable itself.
    // if (usernameValid && emailValid && passwordValid) {
    //   setButtonAvail(true);
    // } else {
    //   setButtonAvail(false);
    // }
    // console.log("password = " + password);
    // console.log("passwordConfirm = " + passwordConfirm);
    // console.log("passwordValid = " + passwordValid);
    // console.log("buttonAvail = " + buttonAvail);
  }

  /**
   * Updates the Username Form, and performs a check to see whether the input is valid or not.
   * This function will then call the function "buttonCheckAvailability()", which will set the 
   *  submission's button availability depending on the new updated validities.
   * @param input - the new username
   */
  const updateFormUsername = (input : string) => {
    setUsername(input);
    if (username.length > 3) {
      setUsernameValid(true);
    } else {
      setUsernameValid(false);
    }
    buttonCheckAvailability();
  }

  /**
   * Updates the Email Form, and performs a check to see whether the input is valid or not.
   * This function will then call the function "buttonCheckAvailability()", which will set the 
   *  submission's button availability depending on the new updated validities.
   * @param input 
   */
  const updateFormEmail = (input : string) => {
    setEmail(input);
    if (email.includes("@") && email.includes(".")) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
    buttonCheckAvailability();
  }

  /**
   * Updates the Password Form, and performs a check to see whether the input is valid or not.
   * This function will also then call the function "buttonCheckAvailability()", which will set the 
   *  submission's button availability depending on the new updated validities.
   * @param input 
   */
  const updateFormPassword = (input : string) => {
    setPassword(input);
    setPasswordValid(checkPasswordValidity(password, passwordConfirm));
    buttonCheckAvailability();
  }

  /**
   * Updates the Password Confirm Form, and performs a check to see whether the input is valid or not.
   * This function will also then call the function "buttonCheckAvailability()", which will set the 
   *  submission's button availability depending on the new updated validities.
   * @param input 
   */
  const updateFormPasswordConfirm = (input : string) => {
    setPasswordConfirm(input);
    setPasswordValid(checkPasswordValidity(password, passwordConfirm));
    buttonCheckAvailability();
  }

  //////////////////////////////
  /*Render Return*/
  //////////////////////////////

  return (

    <View style={{flex:1}}>

      <Overlay headerLabel={"Sign Up"} />

      <ScrollView>

      {/* Card 1:  SignUp Header*/}
      <Card className={cardStyle.header}>
        <CardHeader title={"Sign Up for MTG Squire"} subheader={"Get Access to Wishlist Functionality and More!"} />
      </Card>

      {/* Card 2:  Form Card*/}
      <Card className={cardStyle.normal}>
        <CardHeader title={"Details"} subheader={"Add your account details below"} />
        
        <CardContent>
          
          {/*Username Form*/}
          <Typography className={cardTextStyle.label}>{"Username"}</Typography>
          <TextField 
            variant="outlined"
            margin="normal"
            label="Username"
            autoComplete="off"
            placeholder={"Insert your Username Here"}
            value={username} 
            onChange={(event : any) => {updateFormUsername(event.target.value);}}
            fullWidth
          />

          {/*Email Address Form*/}
          <Typography className={cardTextStyle.label}>{"Email Address"}</Typography>
          <TextField 
            variant="outlined"
            margin="normal"
            label="Email Address"
            autoComplete="off"
            placeholder={"Insert your Email Address Here"}
            value={email} 
            onChange={(event : any) => {updateFormEmail(event.target.value);}}
            // onSubmit={(event : any) => {updateFormEmail(event.target.value);}}
            fullWidth
          />

          {/*Password Form*/}
          <Typography className={cardTextStyle.label}>{"Password"}</Typography>
          <TextField 
            variant="outlined"
            margin="normal"
            label="Password"
            placeholder={"Enter your Password Here"}
            value={password} 
            onChange={(event : any) => {updateFormPassword(event.target.value);}}
            fullWidth
            type="password"
            autoComplete="current-password"
          />

          {/*Password Confirm Form*/}
          <Typography className={cardTextStyle.label}>{"Confirm Password"}</Typography>
          <TextField 
            variant="outlined"
            margin="normal"
            label="Confirm Password"
            placeholder={"Reenter your Password Here"}
            value={passwordConfirm} 
            onChange={(event : any) => {updateFormPasswordConfirm(event.target.value);}}
            fullWidth
            type="password"
            autoComplete="current-password"
          />

        </CardContent>
      </Card>

      <Card>
        {/*Search Button*/}
        <Button 
          disabled={!buttonAvail}
          color={currentTheme.primary.tint}
          title="Sign Up!"
          onPress={(event) => {
            let suppliedInfo : SignUpInfo = {
              username        : username,
              email           : email,
              password        : password,
              passwordConfirm : passwordConfirm,
            }
            submitButtonPress(suppliedInfo, props.firebase, event, setShowLoading, createErrorAlert);
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

export default SignUpForm;