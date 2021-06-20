import React from 'react';
import './QuickSearch.css';
import { View } from 'react-native';
import SearchBar, { SearchCategory } from '../../../components/SearchBar/SearchBar';
import Overlay from '../../../components/Overlay/Overlay';

/**
 * Renders the QuickSearch given that the DataManager has a database to work with.
 */
const QuickSearchDownloaded: React.FC = () => {

  return (

    <View>

      <Overlay headerLabel="Quick Search" />
      <SearchBar searchString="" placeholderText="Search for Magic Cards" category={SearchCategory.Cards}/>

    </View>
  );
};

export default QuickSearchDownloaded;
