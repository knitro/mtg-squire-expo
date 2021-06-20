import React from 'react';
import './Rules.css';
import Overlay from '../../components/Overlay/Overlay';
import WorkInProgress from '../../components/WorkInProgress/WorkInProgress';
import { View } from 'react-native';

const Rules: React.FC = () => {
  return (
    
    <View>

      {/* Displays the Header */}
      <Overlay headerLabel="Rules"/>

      <View>

        <WorkInProgress name={"Rules"}/>

      </View>
      
    </View>
  );
};

export default Rules;
