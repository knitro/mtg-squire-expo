import { makeStyles } from '@material-ui/core';
import { StyleSheet } from 'react-native';
import { currentTheme } from '../theme/Colours';

/**
 * Styles for the Cards
 */
export const CardStyle = makeStyles({
  normal: {
    //Fill in when appropriate
  },
  header: {
    background: currentTheme.secondary.main,
    color: currentTheme.secondary.contrast,
  },
  selected:  {
    background: currentTheme.secondary.tint,
    color: currentTheme.secondary.contrast,
  },
  image: {
    //Fill in when appropriate
  },
});

export const CardTextStyle = makeStyles({
  normal: {
    color: currentTheme.dark.main,
  },
  contrast: {
    color: currentTheme.primary.contrast,
  },
  label: {
    fontWeight:'bold',
    color: currentTheme.dark.main,
  },
  legal: {
    color: currentTheme.success.main,
  },
  notLegal: {
    color: currentTheme.danger.main,
  },
  restricted: {
    color: currentTheme.warning.main,
  },
  banned: {
    color: currentTheme.danger.main,
  },
  unknown: {
    color: currentTheme.dark.main,
  },
  title: {
    color: currentTheme.dark.main,
  },
  subtitle:  {
    color: currentTheme.medium.main,
  },
  content: {
    color: currentTheme.medium.tint,
  },
});