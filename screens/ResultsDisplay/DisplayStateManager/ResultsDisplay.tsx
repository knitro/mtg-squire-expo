import React from 'react';
import { SearchState, getSearchState, cacheSearchState } from '../../../states/SearchState';
import ResultsDisplayComponent from '../DisplayComponent/ResultsDisplayComponent';
import { cacheCurrencyState, CurrencyInformation, getCurrency } from '../../../states/CurrencyState';
import { cacheSettingsState, getSettings } from '../../../states/SettingsState';
import { PriceInformation } from '../../../logic/priceChecker/PriceInterfaces';
import { getCardCosts } from '../../../logic/priceChecker/Prices';

////////////////////////
/*Interfaces*/
////////////////////////

export interface Legality {
  label: string     //The Label to go with the Legality (The Format)
  legality: string  //The Legality Status
  colour: string    //The colour that the Format label should be
};

export interface ResultsDisplayState {
  currentSearchState: SearchState       //The General Information of the current card
  legalitiesFormatted: Legality[]       //The Legality Status of the current card
  additionalRulings: string[]           //The Additional Rules of the current card
  currentCurrency : string              //The Current Currency selected from the settings
  currencyMapping : CurrencyInformation //The Current Currency Conversions
  pricing         : PriceInformation[]  //List of other 
};

////////////////////////
/*DisplayStateManager: Results Display Class*/
////////////////////////

/**
 * Sorts with Async and other constantly updating components for the Results Display Screen.
 */
class ResultsDisplay extends React.Component<{}, ResultsDisplayState> {

  ////////////////////////
  /*Constructor*/
  ////////////////////////

  constructor(props : any) {
    super(props);
    console.log(props);
    this.state = {
      currentSearchState: cacheSearchState,
      legalitiesFormatted: this.formatLegalities(cacheSearchState),
      additionalRulings: this.getRulings(cacheSearchState),
      currentCurrency : cacheSettingsState.currency,
      currencyMapping : cacheCurrencyState,
      pricing : [],
    };

    // this.updateContent = this.updateContent.bind(this);
  }

  ////////////////////////
  /*Update Methods*/
  ////////////////////////

  /**
   * Calls when the Component Mounts.
   */
  async componentDidMount() {

    console.log("Component Mounted")

    /*Compare Status of SearchState*/
    let checkSearchState : SearchState = await getSearchState();
    if (checkSearchState !== this.state.currentSearchState) { //Local Storage is different to cache
      console.log("currentSearchState updated with Local Storage Values");
      this.setState({currentSearchState:  checkSearchState});
      this.setState({legalitiesFormatted: this.formatLegalities(checkSearchState)});
      this.setState({additionalRulings:   this.getRulings(checkSearchState)});
    }

    /*Compare Status of Currency*/
    let checkCurrency : string = (await getSettings()).currency;
    if (checkCurrency !== this.state.currentCurrency) { //Local Storage is different to cache
      console.log("currentCurrency updated with Local Storage Values");
      this.setState({currentCurrency: checkCurrency});
    }

    /*Compare Status of CurrencyMapping*/
    let checkCurrencyMapping : CurrencyInformation = await getCurrency();
    if (checkCurrencyMapping !== this.state.currencyMapping) { //Local Storage is different to cache
      console.log("currencyMapping updated with Local Storage Values");
      this.setState({currencyMapping: checkCurrencyMapping});
    }

    /*Compare Status of Pricing*/
    let checkPricing : PriceInformation[] = await getCardCosts(checkSearchState.tcgplayer_id.toString(),""); 
    if (checkPricing !== this.state.pricing) { //Local Storage is different to cache
      console.log("currencyMapping updated with Local Storage Values");
      this.setState({pricing: checkPricing});
    }
  }

  /**
   * Forces an update to the content by changing it to the cached information.
   */
  updateContent() { 
    console.log("Updating Content");
    this.setState({
      currentSearchState:   cacheSearchState,
      legalitiesFormatted:  this.formatLegalities(cacheSearchState),
      additionalRulings:    this.getRulings(cacheSearchState),
      currentCurrency:      cacheSettingsState.currency,
      currencyMapping:      cacheCurrencyState,
    });
  }

  ////////////////////////
  /*Supporting Methods*/
  ////////////////////////

  /**
   * Returns the Rulings of a Card to be displayed.
   */
  getRulings(search : SearchState) : string[] {

    /*Variable Initialisation*/
    let returnArray : string[] = [];

    /*Add to Return Array*/
    if (search.rulings.length === 0) {
      returnArray.push("None");
    } else {
      search.rulings.map((currentItem: string) => {
        returnArray.push(currentItem);
        return currentItem;
      });
    }

    return returnArray;
  }

  /**
   * Formats the Legalities into a single legality[], making it easier on the render method
   * to render the legalities of a card.
   */
  formatLegalities(search : SearchState) : Legality[] {
    
    /*Variable Initialisation*/
    let returnArray : Legality[] = [];

    /*Add to Return Array*/
    //Standard
    returnArray.push(this.formatLegality("Standard", search.legality.standard));
    //Pioneer
    returnArray.push(this.formatLegality("Pioneer", search.legality.pioneer));
    //Modern
    returnArray.push(this.formatLegality("Modern", search.legality.modern));
    //Legacy
    returnArray.push(this.formatLegality("Legacy", search.legality.legacy));
    //Pauper
    returnArray.push(this.formatLegality("Pauper", search.legality.pauper));
    //Commander
    returnArray.push(this.formatLegality("Commander", search.legality.commander));
    //Vintage
    returnArray.push(this.formatLegality("Vintage", search.legality.vintage));
    //Future
    returnArray.push(this.formatLegality("Future", search.legality.future));
    //Historic
    returnArray.push(this.formatLegality("Historic", search.legality.historic));
    //Brawl
    returnArray.push(this.formatLegality("Brawl", search.legality.brawl));
    //Penny
    returnArray.push(this.formatLegality("Penny", search.legality.penny));
    //Duel
    returnArray.push(this.formatLegality("Duel", search.legality.duel));
    //Old School
    returnArray.push(this.formatLegality("Old School", search.legality.oldschool));

    return returnArray;
  }

  /**
   * Formats a single legality from "Code English" to English.
   * @param format - the Format String to be printed at the start
   * @param legalityString - the Legality string from the legality interface
   */
  formatLegality(format: string, legalityString : string) : Legality {

    let formatCleaned : string = format + ": ";

    if ("legal".localeCompare(legalityString) === 0) {
      return {label: formatCleaned, legality: "Legal", colour: "legal"};
    } else if ("not_legal".localeCompare(legalityString) === 0) {
      return {label: formatCleaned, legality: "Not Legal", colour: "notLegal"};
    } else if ("restricted".localeCompare(legalityString) === 0) {
      return {label: formatCleaned, legality: "Restricted", colour: "restricted"};
    } else if ("banned".localeCompare(legalityString) === 0) {
      return {label: formatCleaned, legality: "Banned", colour: "banned"};
    } else {
      return {label: formatCleaned, legality: "Unsure", colour: "unknown"};
    }
  }

  ////////////////////////
  /*Render*/
  ////////////////////////

  render() {

    /*Display*/ 
    return (
      <ResultsDisplayComponent state={this.state}/>
    );
  }
 
};

export default ResultsDisplay;
