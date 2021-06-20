import React from 'react';
import { SearchState, getSearchRequest } from '../../../states/SearchState';
import SearchResultsComponent from '../DisplayComponent/SearchResultsDisplayComponent';

////////////////////////
/*Interface*/
////////////////////////

export interface SearchResultsState {
  currentSearchState: SearchState[]
};

////////////////////////
/*Class: SearchResults*/
////////////////////////

/**
 * Deals with Async and Updating Components, and forces re-displays via the DisplayComponent.
 */
class SearchResults extends React.Component<{}, SearchResultsState> {

  ////////////////////////
  /*Constructor*/
  ////////////////////////

  constructor(props : any) {
    super(props);
    this.state = {
      currentSearchState: [],
    }
  }

  ////////////////////////
  /*Methods*/
  ////////////////////////

  /**
   * Updates the Components when async results.
   */
  async componentDidMount() {
    this.setState({
      currentSearchState: await getSearchRequest(),
    });
  }

  ////////////////////////
  /*Render*/
  ////////////////////////

  render() {
    return (
      <SearchResultsComponent state={this.state}/>
    );
  }

}

export default SearchResults;