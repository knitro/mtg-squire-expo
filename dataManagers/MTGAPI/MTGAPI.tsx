import DataManager, { DatabaseLoad } from '../DataManager';
import { SearchState, saveSearchState, saveSearchRequest } from '../../states/SearchState';
import axios from 'axios';
import { MTGAPIInformation, blankMTGAPIInformation, MTGAPIRulings } from './MTGAPIInterfaces';
import { saveSearchHistory } from '../../states/SearchHistoryState';
import { AdvancedSearchTerms } from '../DataMangerInterfaces';

class MTGAPI extends DataManager {

  ////////////////////////
  /*Fields*/
  ////////////////////////

  /*None*/

  ////////////////////////
  /*Constructor*/
  ////////////////////////

  constructor(props: any) {
    super(props);
    this.loaded = DatabaseLoad.LOADED; //"Preloaded" since ScryFall is an API, not a local storage db
  }

  ////////////////////////
  /*Implemented Methods*/
  ////////////////////////
  
  downloadDatabase() : void {
    return;
  }

  verifyDatabase() : DatabaseLoad {
    return DatabaseLoad.LOADED;
  }

  loadDatabase(): boolean {
    return true
  }

  async performSearch(currentSearch : SearchState) : Promise<boolean> {

    /*Check what type of Search it is*/

    //If CardName has content, then create the direct URL and perform the search from it
    if  ("".localeCompare(currentSearch.cardName) !== 0) {
      let url = this.percentEncode("https://api.magicthegathering.io/v1/cards?pageSize=1&name=" + currentSearch.cardName);
      return await this.performSearchURL(url);
    }
    //If the URL has content, then grab the URL and perform a direct search
    else if ("".localeCompare(currentSearch.api_uri) !== 0) {
      return await this.performSearchURL(currentSearch.api_uri);
    }
    //Else Condition ==> Return False as now there is no implemented way of interpreting the data
    else {
      return false;
    }
  }

  async performAllSearch(searchTerms : AdvancedSearchTerms) : Promise<boolean> {

    /*Variable Initialisation*/
    let compiledSearchTerm : string = "";

    //Add Main Search Term
    compiledSearchTerm += (searchTerms.mainSearch.toLowerCase());

    //Add Inclusion of Colours
    if (searchTerms.coloursInclude.length !== 0) {
      let coloursIncludeString = "+c:";
      searchTerms.coloursInclude.map((currentColour) => coloursIncludeString += currentColour.toLowerCase());
      compiledSearchTerm += coloursIncludeString;
    }

    //Add Exclusion of Colours
    if (searchTerms.coloursExclude.length !== 0) {
      // let coloursExcludeString = ;
      searchTerms.coloursExclude.map((currentColour) => compiledSearchTerm += "+-c:" + currentColour.toLowerCase());
    }
    

    //Add Card Types
    if (searchTerms.cardTypes.length !== 0) {
      let cardTypesString = "";
      searchTerms.cardTypes.map((currentType) => cardTypesString += "+t:" + currentType.toLowerCase() + " ");
      cardTypesString = cardTypesString.trim();
      compiledSearchTerm += cardTypesString;
    }
    
    //Add Card Text
    if (searchTerms.cardText.length !== 0) {
      let cardText = "";
      searchTerms.cardText.map((currentText) => cardText += "+o:" + currentText.toLowerCase() + " ");
      cardText = cardText.trim();
      compiledSearchTerm += cardText;
    }

    //Get the Final URL
    let url = this.percentEncode("https://api.magicthegathering.io/v1/cards?pageSize=50&name=" + compiledSearchTerm);
    console.log(url);

    /*Perform API Call*/
    try {
      const axiosResult : MTGAPIInformation[] = await axios({
        url: url,
        method: 'GET',
      }).then((response) => {
          //Grab JSON Data
          let output : MTGAPIInformation[] = response.data.data;
          return output;
      }).catch(err => {
        console.log(err);
        return [];
      });

      //Turn the ScryFallInformation[] into a SearchState[]
      let searchResults: SearchState[] = axiosResult.map((currentSearchState) => {
        return this.generateSearchState(currentSearchState, [], []);
      }) 

      //Return Results
      const returnValue = await saveSearchRequest(searchResults);
      if (returnValue === true) {
        if (searchResults.length !== 0) {

          //Save History for Successful Search
          const currentSearchHistory = {
            typeOfSearch: "Advanced Search",
            searchTerm: JSON.stringify(searchTerms),
            url: url
          }
          saveSearchHistory(currentSearchHistory);
          return true;

        } else {
          return false;
        }
      } else {
        return false;
      }

    } catch (err) {

      console.log(err);
      return false
    }
  }

  ////////////////////////
  /*Helper Methods*/
  ////////////////////////

  /**
   * This method should perform the search and store the search result in the database.
   * @param url - the URL of the API call required 
   * @param singleCard - determines whether the resultant search will be an array or a single card. CardName searches should have this set to false, direct api url links should have this set to true.
   */
  async performSearchURL(url : string) : Promise<boolean> {

    console.log("Performing URL Search");
    console.log(url);

    /*Variable Initialisation*/
    try {

      /*Get the API Call*/
      const axiosResult : MTGAPIInformation = await axios({
        url: url,
        method: 'GET',
      }).then((response) => {
        
        /*Grab the JSON Data*/
        if (typeof response.data.data === 'undefined') {
          let output : MTGAPIInformation = response.data;
          return output;
        } else {
          let output : MTGAPIInformation[] = response.data.data;
          let latestResult : MTGAPIInformation = output[0];
          console.log(latestResult);
          return latestResult;
        }
      }).catch(err => {
        console.log(err);
        console.log(blankMTGAPIInformation);
        return blankMTGAPIInformation;
      });

      if (axiosResult === blankMTGAPIInformation) {
        return false;
      }

      const otherPrintings: SearchState[] = await this.getOtherPrintings(axiosResult.prints_search_uri)
      console.log(otherPrintings);
      const searchResult : SearchState = await this.generateSearchStateWithRulings(axiosResult, otherPrintings);
      console.log(searchResult);

      const returnValue = await saveSearchState(searchResult);
      if (returnValue === true) {

        //Save History for Successful Search
        const currentSearchHistory = {
          typeOfSearch: "Quick Search",
          searchTerm: axiosResult.name,
          url: url
        }
        saveSearchHistory(currentSearchHistory);
        console.log("Search Complete");
        return true;

      } else {
        return false;
      }

    } catch (err) {

      console.log(err);
      return false
    }
    
  }

  /**
   * Generates the Search State from given parameter information.
   * @param axiosResult - the ScryFallInformation retrieved from an API call.
   * @param otherPrints - the other printings of the card.
   * @param cardRulings - the specific rulings of the card.
   */
  generateSearchState(axiosResult : MTGAPIInformation, otherPrints : SearchState[], cardRulings : string[]) : SearchState {
    
    /*Get Card Images*/
    const cardImageURL : string = "" 
        + "https://api.scryfall.com/cards/" 
        + axiosResult.set
        + "/" + axiosResult.collector_number
        + "?format=image&version=png";
    
    const cardImageOnlyURL : string = "" 
        + "https://api.scryfall.com/cards/" 
        + axiosResult.set
        + "/" + axiosResult.collector_number
        + "?format=image&version=art_crop";

    /*Generate the SearchState*/
    let searchResult : SearchState = {
      cardName:   axiosResult.name,
      imageLink:  cardImageURL,
      imageOnlyLink: cardImageOnlyURL,
      manaCost:   axiosResult.mana_cost,
      prices: {
        scryFallPricing_nonfoil:  axiosResult.prices.usd,
        scryFallPricing_foil:     axiosResult.prices.usd_foil,
      },
      fullType:   axiosResult.type_line,
      oracleText: axiosResult.oracle_text,
      set : {
        setName: axiosResult.set_name,
        setCode: axiosResult.set,
        imageLink: ""
      },
      legality: {
        standard:   axiosResult.legalities.standard,
        future:     axiosResult.legalities.future,
        historic:   axiosResult.legalities.historic,
        pioneer:    axiosResult.legalities.pioneer,
        modern:     axiosResult.legalities.modern,
        legacy:     axiosResult.legalities.legacy,
        pauper:     axiosResult.legalities.pauper,
        vintage:    axiosResult.legalities.vintage,
        penny:      axiosResult.legalities.penny,
        commander:  axiosResult.legalities.commander,
        brawl:      axiosResult.legalities.brawl,
        duel:       axiosResult.legalities.duel,
        oldschool:  axiosResult.legalities.oldschool
      },
      misc: {
        reserved: axiosResult.reserved,
        foil:     axiosResult.foil,
        nonfoil:  axiosResult.nonfoil,
        promo:    axiosResult.promo,
        reprint:  axiosResult.reprint,
        collector_number: axiosResult.collector_number,
        rarity:   axiosResult.rarity,
        frame:    axiosResult.frame,
        artist:   axiosResult.artist,
        released: axiosResult.released_at,
        digital_only: axiosResult.digital
      },
      rulings: cardRulings,
      otherPrints: otherPrints,
      api_uri: axiosResult.uri,
      tcgplayer_id: axiosResult.tcgplayer_id
    };

    return searchResult;
  }

  /**
   * Returns a Promise string[] of Rulings.
   * @param url The Scryfall URL that the rulings come from.
   */
  async getCardRuling(url : string) : Promise<string[]> {

    let returnArray : string[] = await axios({
      url: url,
      method: 'GET',
    }).then((response) => {

      /*Grab the JSON Data*/
      let stringArray : string[] = [];
      let output : MTGAPIRulings[] = response.data.data;
      output.map((currentRuling: MTGAPIRulings) => stringArray.push(currentRuling.comment));
      return stringArray;
    }).catch(err => {
      console.log(err);
      return [];
    });
    return returnArray;
    
  }

  /**
   * Returns a Promise string[] of Other Printings.
   * @param url The Scryfall URL that the Other Printings come from.
   */
  async getOtherPrintings(url : string) : Promise<SearchState[]> {
    
    let returnArray : SearchState[] = await axios({
      url: url,
      method: 'GET',
    }).then((response) => {

      /*Grab the JSON Data*/
      let searchStateArray : SearchState[] = [];
      let output : MTGAPIInformation[] = response.data.data;

      output.map(async (currentSearchState: MTGAPIInformation) => searchStateArray.push(await this.generateSearchStateWithRulings(currentSearchState, [])));

      return searchStateArray;
    }).catch(err => {
      console.log(err);
      return [];
    });
    return returnArray;
    
  }

  /**
   * Generates a Search State from a ScryFallInformation interface (retrieved from Scryfall API call).
   * @param axiosResult 
   */
  async generateSearchStateWithRulings(axiosResult : MTGAPIInformation, otherPrints : SearchState[]) : Promise<SearchState> {
    
    /*Set Arbitrary Value to the Card Rulings*/
    const cardRulings : string[] = await this.getCardRuling(axiosResult.rulings_uri);

    return this.generateSearchState(axiosResult, otherPrints, cardRulings);
  }

}
  

export default MTGAPI;