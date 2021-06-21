/*React Imports*/
import React from 'react';
import { StackViewStyleInterpolator } from 'react-navigation-stack';
import { Scene, Router, Actions, Reducer, Overlay, Modal, Stack, Lightbox } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';

/*Page Imports*/
import QuickSearchDownloaded from './screens/QuickSearch/DisplayComponent/QuickSearchDownloaded';
import SearchResults from './screens/SearchResults/DisplayStateManager/SearchResults';
import AdvancedSearch from './screens/AdvancedSearch/DisplayComponent/AdvancedSearch';
import Dice from './screens/Dice/DisplayStateManager/Dice';
import TradeCards from './screens/TradeCards/TradeCards';
import Rules from './screens/Rules/Rules';
import SetEVs from './screens/SetEVs/SetEVs';
import SearchHistory from './screens/SearchHistory/DisplayStateManager/SearchHistory';
import Settings from './screens/Settings/DisplayStateManager/Settings';
import Help from './screens/Help/DisplayComponent/Help';
import ResultsDisplay from './screens/ResultsDisplay/DisplayStateManager/ResultsDisplay';
import WishList from './screens/WishList/DisplayStateManager/WishList';
import LifeCounterNewGame from './screens/LifeCounter/DisplayComponent/SetupPages/LifeCounterNewGame';
import LifeCounterSetPlayers from './screens/LifeCounter/DisplayComponent/SetupPages/LifeCounterSetPlayers';
import LifeCounterSetLife from './screens/LifeCounter/DisplayComponent/SetupPages/LifeCounterSetLife';
import LifeCounterConfirm from './screens/LifeCounter/DisplayComponent/SetupPages/LifeCounterConfirm';
import LifeCounter from './screens/LifeCounter/DisplayComponent/LifeCounter';

/*External Component Imports*/
import {v4 as uuid} from 'uuid';
import { currentTheme } from './theme/Colours';
import ScrollToTop from 'react-router-scroll-top'
import Firebase, { FirebaseContext } from './Firebase';
import SignUp from './screens/SignUp/DisplayStateManager/SignUp';
import Login from './screens/Login/DisplayStateManager/Login';
import { getLogin } from './states/LoginState';

////////////////////////////////
/*App Fields*/
////////////////////////////////

let resultsDisplayInitialised : boolean = false;

////////////////////////////////
/*Custom Styles*/
////////////////////////////////

/*Styles for the Tabs*/
const tabStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : 'transparent',
    justifyContent  : 'center',
    alignItems      : 'center',
  },
  tabBarStyle: {
    backgroundColor : '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor : '#ddd',
  },
});

/*Styles for the Navigation Bar*/
const navBarStyle = StyleSheet.create({
  navBar: {
    backgroundColor : currentTheme.primary.main,
  },
  text : {
    color: currentTheme.primary.contrast,
    fontSize: 22,
  },
});

////////////////////////////////
/*Methods for */
////////////////////////////////

const reducerCreate = (params : any) => {
  const defaultReducer = new Reducer(params);
  return (state : any, action : any) => {
    return defaultReducer(state, action);
  };
};

const stateHandler = (prevState : any, newState : any, action : any) => {
  //On State Change
};

const getSceneStyle = () => ({
  backgroundColor: '#F5FCFF', //Light Blue Scene Background Colour
  shadowOpacity: 1,
  shadowRadius: 3,
});

const transitionConfig = () => ({
  screenInterpolator:
    StackViewStyleInterpolator.forFadeFromBottomAndroid,
});

////////////////////////////////
/*App Component Return*/
////////////////////////////////

const App = () => {

  //Logins the user if there is any login information stored
  getLogin();

  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <Router
        createReducer={reducerCreate}
        onStateChange={stateHandler}
        getSceneStyle={getSceneStyle}
        // uriPrefix={prefix} 
      >
        <Overlay key="overlay">
          <ScrollToTop>
            <Modal 
              key="modal" 
              hideNavBar
              transitionConfig={transitionConfig}
            >
              <Lightbox key="lightbox">
                <Stack 
                  key="root" 
                  hideNavBar 
                  titleStyle={{ alignSelf: 'center' }}
                >
                  {/******************************/}
                  {/** Calvin's Pages*/}
                  {/******************************/}

                  {/*Quick Search Scene*/}
                  <Scene
                    key="quickSearch"
                    component={QuickSearchDownloaded}
                    title="Quick Search"
                    tabBarLabel="Quick Search"
                    navigationBarStyle={navBarStyle.navBar}
                    titleStyle={navBarStyle.text}
                  />

                  {/*Results Display Scene*/}
                  <Scene
                    key="resultsDisplay"
                    component={ResultsDisplay}
                    title="Card Page"
                    tabBarLabel="Results "
                    on={()=>{
                      /*Resets the Page on the re-enter of the page*/
                      console.log("onEnter called");
                      if (resultsDisplayInitialised) {
                        Actions.refresh({ key: uuid() });
                      } else {
                        resultsDisplayInitialised = true;
                      }
                    }}
                    navigationBarStyle={navBarStyle.navBar}
                    titleStyle={navBarStyle.text}
                    drawerLockMode={'locked-closed'}
                  />

                  {/*Advanced Search Scene*/}
                  <Scene
                    key="advancedSearch"
                    component={AdvancedSearch}
                    title="Quick Search"
                    navigationBarStyle={navBarStyle.navBar}
                    titleStyle={navBarStyle.text}
                    drawerLockMode={'locked-closed'}
                  />

                  {/*Search Results Scene*/}
                  <Scene
                    key="searchResults"
                    component={SearchResults}
                    title="Card Page"
                    tabBarLabel="Results "
                    on={()=>{
                      /*Resets the Page on the re-enter of the page*/
                      console.log("onEnter called");
                      if (resultsDisplayInitialised) {
                        Actions.refresh({ key: uuid() });
                      } else {
                        resultsDisplayInitialised = true;
                      }
                    }}
                    navigationBarStyle={navBarStyle.navBar}
                    titleStyle={navBarStyle.text}
                    drawerLockMode={'locked-closed'}
                  />

                  {/*Search History Scene*/}
                  <Scene
                    key="searchHistory"
                    component={SearchHistory}
                    title="Search History"
                    navigationBarStyle={navBarStyle.navBar}
                    titleStyle={navBarStyle.text}
                    drawerLockMode={'locked-closed'}
                  />
                  
                  {/*WishList Scene*/}
                  <Scene
                    key="wishlist"
                    component={WishList}
                    title="Settings"
                    navigationBarStyle={navBarStyle.navBar}
                    titleStyle={navBarStyle.text}
                    drawerLockMode={'locked-closed'}
                  />

                  {/******************************/}
                  {/** Matt's Pages*/}
                  {/******************************/}

                  {/*Dice Scene*/}
                  <Scene
                    key="dice"
                    component={Dice}
                    title="Dice"
                    navigationBarStyle={navBarStyle.navBar}
                    titleStyle={navBarStyle.text}
                    drawerLockMode={'locked-closed'}
                  />

                  {/*Settings Scene*/}
                  <Scene
                    key="settings"
                    component={Settings}
                    title="Settings"
                    navigationBarStyle={navBarStyle.navBar}
                    titleStyle={navBarStyle.text}
                  />

                  {/*Help Scene*/}
                  <Scene
                    key="help"
                    component={Help}
                    title="Help"
                    navigationBarStyle={navBarStyle.navBar}
                    titleStyle={navBarStyle.text}
                    drawerLockMode={'locked-closed'}
                  />

                  {/*Life Counter Scene*/}
                  <Scene
                    key="lifeCounter"
                    component={LifeCounterNewGame}
                    title="Life Tracker"
                    navigationBarStyle={navBarStyle.navBar}
                    titleStyle={navBarStyle.text}
                  />

                  {/*Life Counter Setup - Set Number of Players*/}
                  <Scene
                    key="lifeCounterSetPlayer"
                    component={LifeCounterSetPlayers}
                    title="Life Tracker - New Game"
                    navigationBarStyle={navBarStyle.navBar}
                    titleStyle={navBarStyle.text}
                    drawerLockMode={'locked-closed'}
                  />

                  {/*Life Counter Setup - Set Starting Life*/}
                  <Scene
                    key="lifeCounterSetLife"
                    component={LifeCounterSetLife}
                    title="Life Tracker - New Game"
                    navigationBarStyle={navBarStyle.navBar}
                    titleStyle={navBarStyle.text}
                    drawerLockMode={'locked-closed'}
                  />

                  {/*Life Counter Setup - Confirm Settings*/}
                  <Scene
                    key="lifeCounterConfirm"
                    component={LifeCounterConfirm}
                    title="Life Tracker - New Game"
                    navigationBarStyle={navBarStyle.navBar}
                    titleStyle={navBarStyle.text}
                    drawerLockMode={'locked-closed'}
                  />

                  <Scene
                    key="lifeCounterPlay"
                    component={LifeCounter}
                    title="Life Tracker"
                    navigationBarStyle={navBarStyle.navBar}
                    titleStyle={navBarStyle.text}
                    drawerLockMode={'locked-closed'}
                  />

                  {/******************************/}
                  {/** Firebase/Login Pages*/}
                  {/******************************/}
                  
                  <Scene
                    key="signUp"
                    component={SignUp}
                    title="Sign Up"
                    navigationBarStyle={navBarStyle.navBar}
                    titleStyle={navBarStyle.text}
                    drawerLockMode={'locked-closed'}
                  />

                  <Scene
                    key="login"
                    component={Login}
                    title="Login"
                    navigationBarStyle={navBarStyle.navBar}
                    titleStyle={navBarStyle.text}
                    drawerLockMode={'locked-closed'}
                  />


                  {/******************************/}
                  {/** Extension Pages*/}
                  {/******************************/}

                  {/*Trade Scene*/}
                  <Scene
                    key="tradeCards"
                    component={TradeCards}
                    title="Trade Cards"
                    navigationBarStyle={navBarStyle.navBar}
                    titleStyle={navBarStyle.text}
                    drawerLockMode={'locked-closed'}
                  />

                  {/*Rules Scene*/}
                  <Scene
                    key="rules"
                    component={Rules}
                    title="Rules"
                    navigationBarStyle={navBarStyle.navBar}
                    titleStyle={navBarStyle.text}
                    drawerLockMode={'locked-closed'}
                  />

                  {/*Set EVs Scene*/}
                  <Scene
                    key="setEVs"
                    component={SetEVs}
                    title="Set EVs"
                    navigationBarStyle={navBarStyle.navBar}
                    titleStyle={navBarStyle.text}
                    drawerLockMode={'locked-closed'}
                  />

                </Stack>
              </Lightbox>
            </Modal>
          </ScrollToTop>
        </Overlay>
      </Router>
    </FirebaseContext.Provider>
  );
}


export default App;