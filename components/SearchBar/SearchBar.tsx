import React from 'react';
import SearchBarCards from './SearchBarCards/SearchBarCards';
import { Typography } from '@material-ui/core';
import { CardTextStyle } from '../../styles/CardStyle';

/**
 * Enum for specifying the search type of the searchbar.
 */
export enum SearchCategory {
  Cards,
  Rules,
  SetEV
}

/**
 * Props for the SearchBar Component.
 */
interface SearchBarProps {
  searchString: string;
  placeholderText: string;
  category : SearchCategory;
}

/**
 * Creates the SearchBar.
 * @param props - Considers the parameters to set the searchbar.
 */
const SearchBar = (props : SearchBarProps) => {

  /*Variable Initialisation*/
  let category : SearchCategory = props.category;
  const textStyle = CardTextStyle();

  /*Rendering*/
  if (category === SearchCategory.Cards) {
    return (
      <SearchBarCards searchString="" placeholderText="Search for Magic Cards" />
    );
  } else if (category === SearchCategory.Rules) {
    return (
      <div>
        <Typography className={textStyle.normal}>{"This has not been implemented yet"}</Typography>
      </div>
    );
  } else if (category === SearchCategory.SetEV) {
    return (
      <div>
        <Typography className={textStyle.normal}>{"This has not been implemented yet"}</Typography>
      </div>
    );
  } else {
    console.log("ERROR: This is not an implemented SearchBar category");
    return (
      <div>
        <Typography className={textStyle.normal}>{"The SearchBar type is not recognised"}</Typography>
      </div>
    );
  }
  
}

export default SearchBar;