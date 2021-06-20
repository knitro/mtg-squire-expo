////////////////////////
/*Imports*/
////////////////////////

import { Plugins } from '@capacitor/core';
import axios from 'axios';

////////////////////////
/*Local Initialisation*/
////////////////////////

const { Storage } = Plugins;

const storageKey : string = "currency";   // String that dictates the storage identifier in the capacitor.

////////////////////////
/*Export Initialisation*/
////////////////////////

/**
 * Default value for currency information
 * Gives empty values
 */
export const emptyCurrencyInformation : CurrencyInformation = {
  base: "",
  date: "",
  rates: 
    {
      CAD: -1, HKD: -1, ISK: -1, PHP: -1, DKK: -1, HUF: -1,
      CZK: -1, GBP: -1, RON: -1, SEK: -1, IDR: -1, INR: -1,
      BRL: -1, RUB: -1, HRK: -1, JPY: -1, THB: -1, CHF: -1,
      EUR: -1, MYR: -1, BGN: -1, TRY: -1, CNY: -1, NOK: -1,
      NZD: -1, ZAR: -1, USD: -1, MXN: -1, SGD: -1, AUD: -1,
      ILS: -1, KRW: -1, PLN: -1
    }
};

export var cacheCurrencyState : CurrencyInformation = Object.assign([], emptyCurrencyInformation);

////////////////////////
/*Interfaces*/
////////////////////////

/**
 * Interface for currency information 
 * Also used to store from api
 */
export interface CurrencyInformation {
    rates: Currencies;
    base:  string;
    date:  string;
} 

/**
 * Sub interface for CurrencyInformation rates section
 */
interface Currencies {
    CAD: number;
    HKD: number;
    ISK: number;
    PHP: number;
    DKK: number;
    HUF: number;
    CZK: number;
    GBP: number;
    RON: number;
    SEK: number;
    IDR: number;
    INR: number;
    BRL: number;
    RUB: number;
    HRK: number;
    JPY: number;
    THB: number;
    CHF: number;
    EUR: number;
    MYR: number;
    BGN: number;
    TRY: number;
    CNY: number;
    NOK: number;
    NZD: number;
    ZAR: number;
    USD: number;
    MXN: number;
    SGD: number;
    AUD: number;
    ILS: number;
    KRW: number;
    PLN: number;
}

////////////////////////
/*Capacitor Storage for History Storage*/
////////////////////////

/**
 * Saves a CurrencyInformation into storage.
 * @param current the value being put into storage
 */
export async function saveCurrency(current : CurrencyInformation) : Promise<boolean> {

  /*JSONStringify the Currency values*/
  let valueToSave : string = JSON.stringify(current);

  /*Save the Currency into Capacitor Storage*/
  const returnValue = await Storage.set({
    key: storageKey,
    value: valueToSave
  }).then( () => {
    return true;
  }).catch(err => {
    console.log(err);
    return false;
  });

  /*Save to Cache Storage*/
  cacheCurrencyState = current;

  return returnValue;
}

/**
 * Gets current currency mapping from USD to chosen currency
 * Will recall API if no local stored or stored is old
 */
export async function getCurrency() : Promise<CurrencyInformation> {

  /*Variable Initialisation*/
  let date : string = getCurrentDate();
  let currency : CurrencyInformation = await getCurrencyStorage();

  // console.log(currency);

  /*If no previously stored data, then */ 
  if ( "".localeCompare(currency.base)) {
    
    let returnValue : boolean = await getCurrencyAPI();
    if (returnValue) {
      currency = await getCurrencyStorage(); //Return updated value on success
    } else {
      currency = emptyCurrencyInformation; //Return empty on failure
    }

  /*Check if currency information is up to date */
  } else if ( !(date.localeCompare(currency.date) === 0) ) {

    let returnValue : boolean = await getCurrencyAPI();
    if (returnValue) {
      currency = await getCurrencyStorage(); //Return updated value on success
    }
    //On Failure will continue to use previous stored values
  }

  // console.log('before return',currency);

  return currency;
}


/**
 * Retrieves the CurrencyInformation from storage.
 */
async function getCurrencyStorage() : Promise<CurrencyInformation> {

  const storageReturn = await Storage.get({key: storageKey});

  if (typeof storageReturn.value === 'string') {
    return (JSON.parse(storageReturn.value) as CurrencyInformation);
  } else { //Null Case
    return emptyCurrencyInformation;
  }
}

/**
 * Gets current currency multiplier from USD to chosen currency
 * Will recall API if no local stored or stored is old
 * API: https://exchangeratesapi.io/
 * @return returns boolean of API call success
 */
async function getCurrencyAPI() : Promise<boolean> {

  /*Variable Initialisation*/
  const url : string = "https://api.exchangeratesapi.io/latest?base=USD";
  
  /*Perform API Call*/
  try {
    const axiosResult : CurrencyInformation = await axios({
      url: url,
      method: 'GET',
    }).then((response) => {
      let output : CurrencyInformation = response.data;
      output.date = getCurrentDate();
      return output;
      }
    ).catch(error => {
      console.log(error);
      return emptyCurrencyInformation;
    });

    await saveCurrency(axiosResult);
    return true;
  } catch (error) {
    console.log(error);
    return false
  }
}

/**
 * Gets current date as string
 */
function getCurrentDate() : string {
  let date = new Date();
  let dateString = "" + date.getUTCFullYear() + "-" + (date.getUTCMonth()+1) + "-" + date.getUTCDate();
  return dateString;
}
