import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { currentTheme } from '../../theme/Colours';

const HelpIcon = () => {
  return (<Ionicons 
    name={'ios-help-circle'} 
    size={32}
    style={{ marginBottom: -3 }}
    color={currentTheme.primary.contrast}
  />);
};     

export default HelpIcon;
