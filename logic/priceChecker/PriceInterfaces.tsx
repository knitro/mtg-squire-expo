export interface TCGPlayerPrice {
  success : boolean;
  errors : string[];
  results : TCGPlayerPriceResults[];
}

export interface TCGPlayerPriceResults {
  productId : number;
  lowPrice : number;
  midPrice : number;
  highPrice : number;
  marketPrice : number;
  directLowPrice : number;
  subTypeName : string;
}

export var emptyTCGPlayerPrice : TCGPlayerPrice = {
  success:  false,
  errors : [ "empty" ],
  results : []
}

// Interface for display
export interface PriceInformation {
  label : string;
  type  : string;
  value : number;
  provider : string;
}