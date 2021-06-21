import React from 'react';
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';
import SearchIcon from '@material-ui/icons/Search';
import CasinoIcon from '@material-ui/icons/Casino';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import GavelIcon from '@material-ui/icons/Gavel';
import HistoryIcon from '@material-ui/icons/History';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';

////////////////////////////////////////////////
// Props
////////////////////////////////////////////////
interface Props {
  name : string;
};

////////////////////////////////////////////////
// Component
////////////////////////////////////////////////

/**
 * Gets the Icon in relation to the props provided
 * @param props - See props above
 * @returns an Icon
 */
const DrawerIcon = (props : Props) => {

  return (
    ("Quick Search".localeCompare(props.name) === 0)
    ? <YoutubeSearchedForIcon/>
    : ("Advanced Search".localeCompare(props.name) === 0)
    ? <SearchIcon/>
    : ("Dice".localeCompare(props.name) === 0)
    ? <CasinoIcon/>
    : ("Life Tracker".localeCompare(props.name) === 0)
    ? <LocalHospitalIcon/>
    : ("Wishlist".localeCompare(props.name) === 0)
    ? <StarBorderIcon/>
    : ("Trade Cards".localeCompare(props.name) === 0)
    ? <SwapHorizIcon/>
    : ("Rules".localeCompare(props.name) === 0)
    ? <GavelIcon/>
    : ("Set EVs".localeCompare(props.name) === 0)
    ? <HistoryIcon/>
    : ("Settings".localeCompare(props.name) === 0)
    ? <SettingsIcon/>
    : ("Help".localeCompare(props.name) === 0)
    ? <HelpIcon/>
    : ("Back".localeCompare(props.name) === 0)
    ? <KeyboardBackspaceIcon/>
    : <BrokenImageIcon/>
    );
}

export default DrawerIcon;