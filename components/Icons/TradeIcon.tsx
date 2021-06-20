import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { currentTheme } from '../../theme/Colours';

const TradeIcon = () => {
  return (<Ionicons 
    name={'md-swap'} 
    size={32}
    style={{ marginBottom: -3 }}
    color={currentTheme.primary.contrast}
  />);
};     

export default TradeIcon;
