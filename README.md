# README.md for MTG Squire - Assignment 2 SWEN 325

## Group Information

### Group Members

* **Calvin Lee**
  * ECS Username: leecalv
  * Student ID: 300445806
* **Matthew Butterfield**
  * ECS Username: buttermatt
  * Student ID: 300443568

## Required Libraries to Run

* cd into the directory of the project
* npm install
* npm install axios
* any Libraries that VSCode mentions to download incase npm does not install everything.

---

## Components

**Calvin Lee**

1. General - Overlay
2. General - ManaCost
3. General - SearchBar
4. Drawer - Drawer
5. General - DataManagers (ScryFall)
6. General - DataManagers (MTGAPI)
7. ResultsDisplay - GeneralInformationCards
8. ResultsDisplay - LegalitiesCards
9. ResultsDisplay - MiscInformationCards
10. ResultsDisplay - PricingCards
11. ResultsDisplay - SingleOtherPrinting
12. ResultsDisplay - StarCityGames (functions that return components to render)
13. SearchResult - SingleSearchResult
14. SearchHistory - SingleSearchHistoryResult
15. Icons - All Icon Components but CardIcon and ReturnIcon
16. Firebase - firebase.tsx
17. App - (Contains all the Navigation)

**Matthew Butterfield**

18. LifeTotal - LifeTotalOnePlayer
19. LifeTotal - LifeTotalTwoPlayer
20. LifeTotal - LifeTotalThreePlayer
21. LifeTotal - LifeTotalFourPlayer
22. LifeTotal - LifeTotalLeaveButton
23. LifeTotal - FirstScreenButton
24. LifeTotal - SecondScreenButton
25. LifeTotal - SubScreenButton
26. Dice - DiceDisplayCard
27. Dice - DiceComponent
28. Help - HelpCard
29. Drawer - DrawerButton
30. Drawer - DrawerIcon
31. Icons - CardIcon and ReturnIcon

---

## Pages

**Calvin Lee**

1. Quick Search
2. Advanced Search
3. Search Results
4. Results Display
5. Search History
6. Wishlist

**Matthew Butterfield**

6. Wishlist
7. Dice
8. Life Counter Setup
9. Life Counter
10. Settings
11. Help

---

## Logic, State and Storage

**Calvin Lee**

1. Logic - currencyConvert (w/Matt)
2. Logic - dataManagerCall
3. Logic - stringHelper
4. Storage/State - LoginState
5. Storage/State - SearchHistoryState
6. Storage/State - SearchState
7. Storage/State - WishListData
8. Logic - DiceHelper (w/Matt)
9. Logic - LoginLogic
10. Logic - ResultsDisplayLogic
11. Logic - SignUpLogic
12. Logic - WishListLogic

**Matthew Butterfield**

1. Logic - currencyConvert (w/Calvin)
2. Logic - DiceHelper (w/Calvin)
3. Logic - Life Counter helper
4. Logic - Settings helper
5. Logic - TCGPlayer Logic
6. Storage/State - Dice History
7. Storage/State - Currency State
8. Storage/State - Settings State
9. Storage/State - Life Counter Setup State
10. Storage/State - Life Counter Player State

---

## External Assets

**Calvin Lee**

1. Scryfall API: https://scryfall.com/docs/api

ScryFall API allows us to gather verbose information about any card, provide links to card images, and additional rulings.

2. Firebase API: https://firebase.google.com/

Firebase allows us to save data storage, including people's wishlists, as well as encapsulating all the user authentication.


**Matthew Butterfield**

3. European Central Bank API: https://exchangeratesapi.io/

European Central Bank API allows us to convert prices we obtain through any means to any currency we wish to better support different regions.

4. TCG Developer API: http://developer.tcgplayer.com/

TCG Player allows us to get actual market prices of cards from independent and larger card sellers.


## Installed APIs and Plugins

*This is in case "npm i" does not work*

* npm install @types/uuid
* npm install @react-navigation/drawer
* npm install react-navigation
* npm install react-navigation-drawer
* npm install react-native-reanimated
* npm install @material-ui/core
* npm install fontsource-roboto
* npm i swiper
* npm install --save react-swipeable-views
* Or npm install @types/react-swipeable-views
* npm install react-native-elements~~
* npm install -save-dev @types/react-router-dom
* npm install @types/react-native-side-menu
* npm install @types/react-native-drawer
* react-native-router-flux
* npm install firebase