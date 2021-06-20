import axios from 'axios';
import { TCGPlayerPrice, emptyTCGPlayerPrice, PriceInformation, TCGPlayerPriceResults } from './PriceInterfaces';
import { getToken } from './TokenTCGP';


/**
 * Gets TCGPlayer costs from API.
 * @param tcgplayerProductId - ID of card in tcgplayer database
 * @param subtype - type of card (such as "Normal", "Foil") wanted, or all if blank  
 * @returns array of labels and values for each tcgplayer price gotten
 */
export async function getTCGPCosts( tcgplayerProductId : string, subtype : string) : Promise<PriceInformation[]> {
  //assure valid input
  if(tcgplayerProductId == null || subtype == null){
    return [];
  }

  //get token
  const BEARER_TOKEN : string = getToken();

  //get info from api call
  var tcgplayerInfo : TCGPlayerPrice = await callFromAPI(tcgplayerProductId,BEARER_TOKEN);

  //check if successful
  if(!tcgplayerInfo.success){
    return [];
  }

  //return value if fails or getting all
  var info_array : PriceInformation[] = [];

  //find correct subtype
  for(let i : number = 0; i<tcgplayerInfo.results.length; i++){
    var results : TCGPlayerPriceResults = tcgplayerInfo.results[i];

    if(''.localeCompare(subtype) === 0){
      //add all to list if field was blank
      info_array.push({ label: "TCGPlayer Low Price",        value: results.lowPrice,       type: results.subTypeName, provider: "TCGPlayer" });
      info_array.push({ label: "TCGPlayer Mid Price",        value: results.midPrice,       type: results.subTypeName, provider: "TCGPlayer" });
      info_array.push({ label: "TCGPlayer High Price",       value: results.highPrice,      type: results.subTypeName, provider: "TCGPlayer" });
      info_array.push({ label: "TCGPlayer Market Price",     value: results.marketPrice,    type: results.subTypeName, provider: "TCGPlayer" });
      info_array.push({ label: "TCGPlayer Direct Low Price", value: results.directLowPrice, type: results.subTypeName, provider: "TCGPlayer" });
    } else if(subtype.localeCompare(results.subTypeName) === 0 ){
      //check if correct subtype then return chosen
      return [
        { label: "TCGPlayer Low Price",        value: results.lowPrice,       type: subtype, provider: "TCGPlayer" },
        { label: "TCGPlayer Mid Price",        value: results.midPrice,       type: subtype, provider: "TCGPlayer" },
        { label: "TCGPlayer High Price",       value: results.highPrice,      type: subtype, provider: "TCGPlayer" },
        { label: "TCGPlayer Market Price",     value: results.marketPrice,    type: subtype, provider: "TCGPlayer" },
        { label: "TCGPlayer Direct Low Price", value: results.directLowPrice, type: subtype, provider: "TCGPlayer" },
      ]
    }
  }

  //blank return if unable to find
  return info_array;

}


/**
 * calls tcgplayer api to get pricing for the given product
 * @param tcgplayerProductId - ID of card in tcgplayer database
 * @param BEARER_TOKEN - unique token used as authentication
 * @returns object gotten from API
 */
async function callFromAPI( tcgplayerProductId : string, BEARER_TOKEN : string ) : Promise<TCGPlayerPrice> {

  /*Variable Initialisation*/
  const url : string = "https://api.tcgplayer.com/pricing/product/"+tcgplayerProductId;

  /*Perform API Call*/
  try {
    const axiosResult : TCGPlayerPrice = await axios({
      url: url,
      method: 'GET',
      headers:{
          Accept: "application/json",
          // "User-Agent": "NZMTGApp",
          Authorization: "bearer "+BEARER_TOKEN,
      }
    }).then((response) => {
      let output : TCGPlayerPrice = response.data;
      return output;
      }
    ).catch(error => {
      console.log(error);
      return emptyTCGPlayerPrice;
    });
    return axiosResult;

  } catch (error) {
    console.log(error);
    return emptyTCGPlayerPrice;
  }
}
