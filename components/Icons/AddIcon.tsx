import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { currentTheme } from '../../theme/Colours';

const AddIcon = () => {
  return (<Ionicons 
    name={'md-add'} 
    size={32}
    color={currentTheme.primary.contrast}
  />);
};     

export default AddIcon;
