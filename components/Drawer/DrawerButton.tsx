import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DrawerIcon from './DrawerIcon'

////////////////////////////////////////////////
// Props
////////////////////////////////////////////////
interface Props {
  name : string;
  buttonNav : () => void;
  closeDrawer : () => void;
};

////////////////////////////////////////////////
// Component
////////////////////////////////////////////////

/**
 * Returns a Button for the Drawer
 * @param props - see props above
 * @returns a Singular button with an icon and text that redirects the user to a certain page.
 */
const DrawerButton = (props : Props) => {

  const iconName : string = props.name;
  const label : string = props.name;

  return (

    <ListItem button onClick={() => {
      props.buttonNav();    
      props.closeDrawer()
    }}>
      <ListItemIcon>
        <DrawerIcon name={iconName}/>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );
}

export default DrawerButton;