import { PriceInformation } from "./PriceInterfaces";
import { getTCGPCosts } from "./PriceTCGP";

/**
 * Gets TCGPlayer costs from API.
 * @param tcgplayerProductId - ID of card in tcgplayer database
 * @param subtype - type of card (such as "Normal", "Foil") wanted, or all if blank  
 * @returns array of labels and values for each tcgplayer price gotten
 */
export async function getCardCosts( tcgplayerProductId : string, subtype : string) : Promise<PriceInformation[]> {

    var price_array : PriceInformation[] = [];

    //TCGPlayer cards
    price_array = price_array.concat(await getTCGPCosts(tcgplayerProductId, subtype));


    return price_array;
}