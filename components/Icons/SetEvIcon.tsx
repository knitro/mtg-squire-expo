import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { currentTheme } from '../../theme/Colours';

const SetEvIcon = () => {
  return (<Ionicons 
    name={'md-menu'} 
    size={32}
    color={currentTheme.primary.contrast}
  />);
};     

export default SetEvIcon;
