import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { currentTheme } from '../../theme/Colours';

const DiceIcon = () => {
  return (<Ionicons 
    name={'md-cube'} 
    size={32}
    style={{ marginBottom: -3 }}
    color={currentTheme.primary.contrast}
  />);
};     

export default DiceIcon;
