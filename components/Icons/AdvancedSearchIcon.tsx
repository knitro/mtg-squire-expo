import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { currentTheme } from '../../theme/Colours';

const AdvancedSearchIcon = () => {
  return (<Ionicons 
    name={'md-search'} 
    size={32}
    style={{ marginBottom: -3 }}
    color={currentTheme.primary.contrast}
  />);
};     

export default AdvancedSearchIcon;
