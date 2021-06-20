import React, { Component } from 'react';
import {v4 as uuid} from 'uuid';
import { getSearchState } from '../../states/SearchState';
import { View } from 'react-native';
import { Asset } from 'expo-asset';
import { Grid } from '@material-ui/core';

import './ManaCost.css';

////////////////////////
/*Interfaces*/
////////////////////////

/**
 * The Main Interface.
 * This is used as for the "static database" to map a tag to an asset image link.
 */
export interface symbolToImageInterface {
  tag : string //The Standard Notation Tag without the {}
  dir : string //The Directory of the File associated to the String
}

/**
 * Maps Symbol Tags to Image URIs. Note that the uri field of the interface MUST be explicitly
 *  declared without the use of fields/constants.
 */
const symbolToImageCollection : symbolToImageInterface[]= [
  {tag: "0",    dir: Asset.fromModule(require("../../assets/images/manacost/0.png")).uri},
  {tag: "1",    dir: Asset.fromModule(require("../../assets/images/manacost/1.png")).uri},
  {tag: "2",    dir: Asset.fromModule(require("../../assets/images/manacost/2.png")).uri},
  {tag: "2/B",  dir: Asset.fromModule(require("../../assets/images/manacost/2B.png")).uri},
  {tag: "2/G",  dir: Asset.fromModule(require("../../assets/images/manacost/2G.png")).uri},
  {tag: "2/R",  dir: Asset.fromModule(require("../../assets/images/manacost/2R.png")).uri},
  {tag: "2/U",  dir: Asset.fromModule(require("../../assets/images/manacost/2U.png")).uri},
  {tag: "2/W",  dir: Asset.fromModule(require("../../assets/images/manacost/2W.png")).uri},
  {tag: "3",    dir: Asset.fromModule(require("../../assets/images/manacost/3.png")).uri},
  {tag: "4",    dir: Asset.fromModule(require("../../assets/images/manacost/4.png")).uri},
  {tag: "5",    dir: Asset.fromModule(require("../../assets/images/manacost/5.png")).uri},
  {tag: "6",    dir: Asset.fromModule(require("../../assets/images/manacost/6.png")).uri},
  {tag: "7",    dir: Asset.fromModule(require("../../assets/images/manacost/7.png")).uri},
  {tag: "8",    dir: Asset.fromModule(require("../../assets/images/manacost/8.png")).uri},
  {tag: "9",    dir: Asset.fromModule(require("../../assets/images/manacost/9.png")).uri},
  {tag: "10",   dir: Asset.fromModule(require("../../assets/images/manacost/10.png")).uri},
  {tag: "11",   dir: Asset.fromModule(require("../../assets/images/manacost/11.png")).uri},
  {tag: "12",   dir: Asset.fromModule(require("../../assets/images/manacost/12.png")).uri},
  {tag: "13",   dir: Asset.fromModule(require("../../assets/images/manacost/13.png")).uri},
  {tag: "14",   dir: Asset.fromModule(require("../../assets/images/manacost/14.png")).uri},
  {tag: "15",   dir: Asset.fromModule(require("../../assets/images/manacost/15.png")).uri},
  {tag: "16",   dir: Asset.fromModule(require("../../assets/images/manacost/16.png")).uri},
  {tag: "17",   dir: Asset.fromModule(require("../../assets/images/manacost/17.png")).uri},
  {tag: "18",   dir: Asset.fromModule(require("../../assets/images/manacost/18.png")).uri},
  {tag: "19",   dir: Asset.fromModule(require("../../assets/images/manacost/19.png")).uri},
  {tag: "20",   dir: Asset.fromModule(require("../../assets/images/manacost/20.png")).uri},
  {tag: "B",    dir: Asset.fromModule(require("../../assets/images/manacost/B.png")).uri},
  {tag: "B/G",  dir: Asset.fromModule(require("../../assets/images/manacost/BG.png")).uri},
  {tag: "B/P",  dir: Asset.fromModule(require("../../assets/images/manacost/BP.png")).uri},
  {tag: "B/R",  dir: Asset.fromModule(require("../../assets/images/manacost/BR.png")).uri},
  {tag: "C",    dir: Asset.fromModule(require("../../assets/images/manacost/C.png")).uri},
  {tag: "G",    dir: Asset.fromModule(require("../../assets/images/manacost/G.png")).uri},
  {tag: "G/P",  dir: Asset.fromModule(require("../../assets/images/manacost/GP.png")).uri},
  {tag: "G/U",  dir: Asset.fromModule(require("../../assets/images/manacost/GU.png")).uri},
  {tag: "G/W",  dir: Asset.fromModule(require("../../assets/images/manacost/GW.png")).uri},
  {tag: "R",    dir: Asset.fromModule(require("../../assets/images/manacost/R.png")).uri},
  {tag: "R/G",  dir: Asset.fromModule(require("../../assets/images/manacost/RG.png")).uri},
  {tag: "R/P",  dir: Asset.fromModule(require("../../assets/images/manacost/RP.png")).uri},
  {tag: "R/W",  dir: Asset.fromModule(require("../../assets/images/manacost/RW.png")).uri},
  {tag: "S",    dir: Asset.fromModule(require("../../assets/images/manacost/S.png")).uri},
  {tag: "U",    dir: Asset.fromModule(require("../../assets/images/manacost/U.png")).uri},
  {tag: "U/B",  dir: Asset.fromModule(require("../../assets/images/manacost/UB.png")).uri},
  {tag: "U/P",  dir: Asset.fromModule(require("../../assets/images/manacost/UP.png")).uri},
  {tag: "U/R",  dir: Asset.fromModule(require("../../assets/images/manacost/UR.png")).uri},
  {tag: "W",    dir: Asset.fromModule(require("../../assets/images/manacost/W.png")).uri},
  {tag: "W/B",  dir: Asset.fromModule(require("../../assets/images/manacost/WB.png")).uri},
  {tag: "W/P",  dir: Asset.fromModule(require("../../assets/images/manacost/WP.png")).uri},
  {tag: "W/U",  dir: Asset.fromModule(require("../../assets/images/manacost/WU.png")).uri},
  {tag: "X",    dir: Asset.fromModule(require("../../assets/images/manacost/X.png")).uri},
  {tag: "½",    dir: Asset.fromModule(require("../../assets/images/manacost/½.png")).uri},
  {tag: "100",  dir: Asset.fromModule(require("../../assets/images/manacost/100.png")).uri},
  {tag: "1000000", dir: Asset.fromModule(require("../../assets/images/manacost/1000000.png")).uri},
  {tag: "∞",    dir: Asset.fromModule(require("../../assets/images/manacost/∞.png")).uri},
  {tag: "A",    dir: Asset.fromModule(require("../../assets/images/manacost/A.png")).uri},
  {tag: "CHAOS", dir: Asset.fromModule(require("../../assets/images/manacost/CHAOS.png")).uri},
  {tag: "E",    dir: Asset.fromModule(require("../../assets/images/manacost/E.png")).uri},
  {tag: "HR",   dir: Asset.fromModule(require("../../assets/images/manacost/HR.png")).uri},
  {tag: "HW",   dir: Asset.fromModule(require("../../assets/images/manacost/HW.png")).uri},
  {tag: "P",    dir: Asset.fromModule(require("../../assets/images/manacost/P.png")).uri},
  {tag: "PW",   dir: Asset.fromModule(require("../../assets/images/manacost/PW.png")).uri},
  {tag: "Q",    dir: Asset.fromModule(require("../../assets/images/manacost/Q.png")).uri},
  {tag: "T",    dir: Asset.fromModule(require("../../assets/images/manacost/T.png")).uri},
  {tag: "Y",    dir: Asset.fromModule(require("../../assets/images/manacost/Y.png")).uri},
  {tag: "Z",    dir: Asset.fromModule(require("../../assets/images/manacost/Z.png")).uri}
];

class ManaCost extends Component<{cost : string}> {

  ////////////////////////
  /*Fields*/
  ////////////////////////

  currentCost : string;

  ////////////////////////
  /*Constructor*/
  ////////////////////////

  constructor(props : any) {
    super(props)
    this.currentCost = props.cost;
  }

  ////////////////////////
  /*Methods*/
  ////////////////////////

  /**
   * Updates the ManaCost with the correct mana cost and/or new information.
   */
  async componentDidMount() {
    this.currentCost = (await getSearchState()).manaCost;
  }

  /**
   * Parses the Entire Mana Cost as per the parameter.
   * It should call determineSymbol(string) for each symbol it comes across.
   * Each symbol is represented through {} brackets.
   * @param manaCostString - the SideBarItem to render
   */
  parseManaCost (manaCostString: string) {

    let removedString : string = manaCostString.substr(1,manaCostString.length-2); //Remove the starting '{' and ending '}'
    let splitString : string[] = removedString.split("}{"); //Split the string using the specified delimiter

    return (
      <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
      >
        { splitString.map((currentSplit: string) => this.determineSymbol(currentSplit)) }
      </Grid>
    );
  }

  /**
   * Returns an Image represented by the parameter.
   * It retrieves the image from the static field "symbolToImageCollection".
   * If the symbol is unrecognised, it 
   * @param symbol 
   */
  determineSymbol(symbol : string) {

    /*Variable Initialisation*/
    let currentDirectory : string =  "../../assets/images/manacost/0.png"; //Default Value
    let symbolType : string = "normalSymbolImage";

    /*Get the Image URL Reference*/
    symbolToImageCollection.forEach(
      currentInterface => {
        if (currentInterface.tag === symbol) {
          currentDirectory = currentInterface.dir;
        }
      }
    );

    /*Adjust for Weird Symbol Image Scaling*/
    if (symbol === "1000000") {
      symbolType = "symbol_1000000";
    } else if (symbol === "100") {
      symbolType = "symbol_100";
    }

    // console.log(currentDirectory);
    return (
      <img key={uuid()} src={currentDirectory} className={symbolType} alt={currentDirectory}/>
    );
  }

  ////////////////////////
  /*Render*/
  ////////////////////////

  render() {
    return (
      <View>
        {this.parseManaCost(this.currentCost)}
      </View>
    );
  }
}

export default ManaCost;