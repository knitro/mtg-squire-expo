import React from 'react';
import { Button, View } from 'react-native';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';

/**
 * Interface of inputs for HelpCard
 */
interface HelpCardProps{
  title : string;      //title of card
  text : string;       //text displayed on card
  buttonText : string; //text displayed on button
  buttonNav() : any; //link to page button will go to
}


/**
 * Helper component for Help
 * @param props - values for displaying information on card
 */
const HelpCard = (props : HelpCardProps) => {

  return (
    <Card>
      <CardHeader title={props.title}/>

      <CardContent>
        <Typography>
          {props.text}
        </Typography>
        <View>
          {
          (''.localeCompare(props.buttonText) === 0)
          ? <View/>
          : <Button 
              onPress ={() => props.buttonNav()}//navigation.navigate(props.buttonNav)}
              title={props.buttonText}
            />        
          }
        </View>
      </CardContent>
    </Card>
  );
};

export default HelpCard;
