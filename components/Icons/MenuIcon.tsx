import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { currentTheme } from '../../theme/Colours';

const sizeOfMenu : number = 30;

const MenuIcon = () => {
  return (
    <Ionicons 
      name={'md-menu'} 
      size={sizeOfMenu}
      style={{ 
        marginLeft  : (sizeOfMenu/3),
      }}
      color={currentTheme.primary.contrast}
    />
  );
};     

export default MenuIcon;
