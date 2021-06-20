import React from 'react';
import { View } from 'react-native';
import AdvancedSearchIcon from '../Icons/AdvancedSearchIcon';
import DiceIcon from '../Icons/DiceIcon';
import HelpIcon from '../Icons/HelpIcon';
import LifeIcon from '../Icons/LifeIcon';
import ReturnIcon from '../Icons/ReturnIcon';
import RulesIcon from '../Icons/RulesIcon';
import SearchHistoryIcon from '../Icons/SearchHistoryIcon';
import SearchIcon from '../Icons/SearchIcon';
import SetEvIcon from '../Icons/SetEvIcon';
import SettingsIcon from '../Icons/SettingsIcon';
import TradeIcon from '../Icons/TradeIcon';
import WishListIcon from '../Icons/WishListIcon';

interface DrawerIconProps {
  name : string;
};

const DrawerIcon = (props : DrawerIconProps) => {

  return (
    ("Quick Search".localeCompare(props.name) === 0)
    ? <SearchIcon/>
    : ("Advanced Search".localeCompare(props.name) === 0)
    ? <AdvancedSearchIcon/>
    : ("Dice".localeCompare(props.name) === 0)
    ? <DiceIcon/>
    : ("Life Tracker".localeCompare(props.name) === 0)
    ? <LifeIcon/>
    : ("Wishlist".localeCompare(props.name) === 0)
    ? <WishListIcon/>
    : ("Trade Cards".localeCompare(props.name) === 0)
    ? <TradeIcon/>
    : ("Rules".localeCompare(props.name) === 0)
    ? <RulesIcon/>
    : ("Set EVs".localeCompare(props.name) === 0)
    ? <SetEvIcon/>
    : ("Search History".localeCompare(props.name) === 0)
    ? <SearchHistoryIcon/>
    : ("Settings".localeCompare(props.name) === 0)
    ? <SettingsIcon/>
    : ("Help".localeCompare(props.name) === 0)
    ? <HelpIcon/>
    : ("Back".localeCompare(props.name) === 0)
    ? <ReturnIcon/>

    : <View/>




    );
}

export default DrawerIcon;