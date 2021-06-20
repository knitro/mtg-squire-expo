////////////////////////
/*Imports*/
////////////////////////

import React from 'react';
import { createContext, useState, useEffect } from 'react';
import { Plugins } from '@capacitor/core';
import { Game } from './LifeCounterSetupState';

////////////////////////
/*Local Initialisation*/
////////////////////////

const { Storage } = Plugins;

const storageKey : string = "players";   // String that dictates the storage identifier in the capacitor.

////////////////////////
/*Interfaces*/
////////////////////////

/**
 * Interface for counters for a single player
 */
export interface Player {
    lifeTotal : number;
    valueW : number;
    valueU : number;
    valueB : number;
    valueR : number;
    valueG : number;
    valueC : number;
}

/**
 * Interface for multiple players
 */
export interface Players {
    players : Player[]
}

////////////////////////
/*Functions*/
////////////////////////

/**
 * Function to save an update based on a single player and counter change
 * @param players interface with all information of players to store
 * @param player player which has the value changing
 * @param change amount which is changing (+/- 1)
 * @param option which counter is changing
 */
export async function updatePlayer(players : Player[], player : number, change : number, option : string) {

  let playersSave: Player[] = await loadPlayers();
  if ('lifeTotal'.localeCompare(option) === 0) {
    players[player].lifeTotal += change;
    playersSave[player].lifeTotal += change;
  } else if ('valueW'.localeCompare(option) === 0) {
    players[player].valueW += change;
    playersSave[player].valueW += change;
  } else if ('valueU'.localeCompare(option) === 0) {
    players[player].valueU += change;
    playersSave[player].valueU += change;
  } else if ('valueB'.localeCompare(option) === 0) {
    players[player].valueB += change;
    playersSave[player].valueB += change;
  } else if ('valueR'.localeCompare(option) === 0) {
    players[player].valueR += change;
    playersSave[player].valueR += change;
  } else if ('valueG'.localeCompare(option) === 0) {
    players[player].valueG += change;
    playersSave[player].valueG += change;
  } else {
    players[player].valueC += change;
    playersSave[player].valueC += change;
  }
  savePlayers(playersSave);
}

/**
 * Sets up and storages player interface based on game settings
 * @param g game settings to start game with
 */
export function createPlayers(g : Game) {
  let p : Player[] = [];
  for (let index = 0; index < g.numberPlayers; index++) {
    p.push({
      lifeTotal : g.lifeTotal,
      valueW : 0,
      valueU : 0,
      valueB : 0,
      valueR : 0,
      valueG : 0,
      valueC : 0,
    });        
  }
  savePlayers(p)
}

////////////////////////
/*Capacitor Storage   */
////////////////////////

/**
 * Stores to player information to capacitor storage
 * @param players array of player values to store
 */
async function savePlayers(players : Player[]) {
  await Storage.set({
    key: storageKey,
    value: JSON.stringify(players)
  });
}

/**
 * Loads to player information from capacitor storage
 * @param players array of player values to store
 */
async function loadPlayers() : Promise<Player[]> {
    
  const storageReturn = await Storage.get({key: storageKey});

  if (typeof storageReturn.value === 'string') {
    return (JSON.parse(storageReturn.value) as Player[]);
  } else { //Null Case
    return [];
  }

}

let PlayersContext = createContext({} as Players);

/**
 * Context provider to get player information from capacitor storage
 */
function PlayersContextProvider(props: { children: React.ReactNode; }) {
    
  const [initialPlayers, setInitialPlayers] = useState([] as Player[]);

  useEffect(() => {
    Promise.resolve(Storage.get({key: storageKey}).then(
      (result) => {
        if (typeof result.value === 'string') {
          setInitialPlayers(JSON.parse(result.value) as Player[]);
        }
      },
      (reason) => console.log("Failed to load players from storage because of: " + reason)
    ));
  }, []);
  return (
    <PlayersContext.Provider value={{players : initialPlayers}}>{props.children}</PlayersContext.Provider>
  )
}

let PlayersContextConsumer = PlayersContext.Consumer;

export { PlayersContext, PlayersContextProvider, PlayersContextConsumer };
