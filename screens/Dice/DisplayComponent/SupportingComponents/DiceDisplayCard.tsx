import React from 'react';
import { Card, CardHeader } from '@material-ui/core';

interface DiceDisplayCardProps {
  dieValue : string
  dieType : string
};

const DiceDisplayCard = (props : DiceDisplayCardProps) => {

  /*Variable Initialisation*/
  const dieValue : string = props.dieValue;
  const dieType : string = props.dieType;

  /*Display and Return*/
  return (
    <Card>
      <CardHeader
        title={dieValue}
        subheader={dieType}
      />
    </Card>
  );
}

export default DiceDisplayCard;