import { CurrencyInformation } from '../states/CurrencyState';

////////////////////////
/*Exported Functions*/
////////////////////////

/**
 * Converts the value parameter to the appropriate value after currency conversions.
 * This function will return -1 if either of the currencies are not recognised.
 * @param value - the value to convert
 * @param currencyFrom - the currency of the value param
 * @param currencyTo - the currency to convert value to
 * @param currencyInformation - the currency value information to supply the currency conversions.
 */
export function getConvertedValue(value : number, currencyFrom : string, currencyTo: string, currencyInformation : CurrencyInformation) : number {

  /*Get the Currency Values*/
  let currencyFromValue : number = getCurrencyValue(currencyFrom, currencyInformation);
  let currencyToValue : number = getCurrencyValue(currencyTo, currencyInformation);

  //Check for Valid Currency Values
  if ((currencyFromValue === -1) || (currencyToValue === -1)) {
    return -1; //Denotes a Failed Conversion
  }

  /*Adjust the value with the appropriate Currency Conversions*/
  let returnValue : number = value;
  returnValue /= currencyFromValue;
  returnValue *= currencyToValue;

  return returnValue;
}

////////////////////////
/*Local Functions*/
////////////////////////

/**
 * Returns the currency rate in relation to the base currency (USD) of the "type" parameter.
 * If an invalid string is provided, a value of -1 is returned instead to denote a failure.
 * @param type - the currency string
 * @param currencies - the storage class of currency
 */
function getCurrencyValue(type : string, currencies : CurrencyInformation) : number {
  if ("CAD".localeCompare(type) === 0)
    return currencies.rates.CAD;
  else if ("HKD".localeCompare(type) === 0)
    return currencies.rates.HKD;
  else if ("ISK".localeCompare(type) === 0)
    return currencies.rates.ISK;
  else if ("PHP".localeCompare(type) === 0)
    return currencies.rates.PHP;
  else if ("DKK".localeCompare(type) === 0)
    return currencies.rates.DKK;
  else if ("HUF".localeCompare(type) === 0)
    return currencies.rates.HUF;
  else if ("CZK".localeCompare(type) === 0)
    return currencies.rates.CZK;
  else if ("GBP".localeCompare(type) === 0)
    return currencies.rates.GBP;
  else if ("RON".localeCompare(type) === 0)
    return currencies.rates.RON;
  else if ("SEK".localeCompare(type) === 0)
    return currencies.rates.SEK;
  else if ("IDR".localeCompare(type) === 0)
    return currencies.rates.IDR;
  else if ("INR".localeCompare(type) === 0)
    return currencies.rates.INR;
  else if ("BRL".localeCompare(type) === 0)
    return currencies.rates.BRL;
  else if ("RUB".localeCompare(type) === 0)
    return currencies.rates.RUB;
  else if ("HRK".localeCompare(type) === 0)
    return currencies.rates.HRK;
  else if ("JPY".localeCompare(type) === 0)
    return currencies.rates.JPY;
  else if ("THB".localeCompare(type) === 0)
    return currencies.rates.THB;
  else if ("CHF".localeCompare(type) === 0)
    return currencies.rates.CHF;
  else if ("EUR".localeCompare(type) === 0)
    return currencies.rates.EUR;
  else if ("MYR".localeCompare(type) === 0)
    return currencies.rates.MYR;
  else if ("BGN".localeCompare(type) === 0)
    return currencies.rates.BGN;
  else if ("TRY".localeCompare(type) === 0)
    return currencies.rates.TRY;
  else if ("CNY".localeCompare(type) === 0)
    return currencies.rates.CNY;
  else if ("NOK".localeCompare(type) === 0)
    return currencies.rates.NOK;
  else if ("NZD".localeCompare(type) === 0)
    return currencies.rates.NZD;
  else if ("ZAR".localeCompare(type) === 0)
    return currencies.rates.ZAR;
  else if ("MXN".localeCompare(type) === 0)
    return currencies.rates.MXN;
  else if ("SGD".localeCompare(type) === 0)
    return currencies.rates.SGD;
  else if ("AUD".localeCompare(type) === 0)
    return currencies.rates.AUD;
  else if ("ILS".localeCompare(type) === 0)
    return currencies.rates.ILS;
  else if ("KRW".localeCompare(type) === 0)
    return currencies.rates.KRW;
  else if ("PLN".localeCompare(type) === 0)
    return currencies.rates.PLN;
  else if ("USD".localeCompare(type) === 0)
    return currencies.rates.USD;
  else
    return -1;
}

