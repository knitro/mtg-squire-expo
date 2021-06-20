import DataManager, { DatabaseLoad } from '../DataManager';
import { SearchState } from '../../states/SearchState';
import { AdvancedSearchTerms } from '../DataMangerInterfaces';

/**
 * A DataManager that is implemented through the using a SQLLite Database.
 * This has not been fully implemented, and SQL Libraries need to be implemented.
 */
class SQLLite extends DataManager {

  ////////////////////////
  /*Fields*/
  ////////////////////////

  /*Constant Links*/
  private fileName          : string = "AllPrintings.sqlite";
  private fileDownloadLink  : string = "https://mtgjson.com/api/v5/AllPrintings.sqlite";
  private sha256            : string = "AllPrintings.sqlite.sha256";
  private sha256Link        : string = "https://mtgjson.com/api/v5/AllPrintings.sqlite.sha256";
  private directory         : string = ""; //To be Filled in if this work is extended upon

  ////////////////////////
  /*Constructor*/
  ////////////////////////

  ////////////////////////
  /*Implemented Methods*/
  ////////////////////////
  
  downloadDatabase() : void {
    this.downloadingDatabase(this.fileDownloadLink, this.fileName);
  }

  verifyDatabase() : DatabaseLoad {
    return this.verifyingDatabase(this.sha256Link, this.sha256);
  }

  loadDatabase(): boolean {
    return this.loadingDatabase(this.fileName, this.directory);
  }

  async performSearch(currentSearch : SearchState) : Promise<boolean> {
    //To be Filled in if this work is extended upon
    return false;    
  }

  async performAllSearch(searchTerms : AdvancedSearchTerms) : Promise<boolean> {
    //To be Filled in if this work is extended upon
    return false;
  }
  
}
  
export default SQLLite;