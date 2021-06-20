import React from 'react';
import './TradeCards.css';
import Overlay from '../../components/Overlay/Overlay';
import WorkInProgress from '../../components/WorkInProgress/WorkInProgress';
import { View } from 'react-native';

const TradeCards: React.FC = () => {
  return (
    
    <View>

      {/* Displays the Header */}
      <Overlay headerLabel="TradeCards"/>

      <View>

        <WorkInProgress name={"TradeCards"}/>

      </View>
      
    </View>
  );
};

export default TradeCards;
