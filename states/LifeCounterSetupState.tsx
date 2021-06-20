////////////////////////
/*Imports*/
////////////////////////

import React from 'react';
import { createContext, useState, useEffect } from 'react';
import { Plugins } from '@capacitor/core';

////////////////////////
/*Local Initialisation*/
////////////////////////

const { Storage } = Plugins;

const storageKey : string = "game";   // String that dictates the storage identifier in the capacitor.

////////////////////////
/*Game Interface*/
////////////////////////

/**
 * Interface for game setup data
 */
export interface Game {
    numberPlayers : number;
    lifeTotal : number;
}

////////////////////////
/*Capacitor Storage   */
////////////////////////

/**
 * Stores to game setup information to capacitor storage
 * @param g game setup values to store
 */
export async function saveGame(g : Game){
    await Storage.set({
        key: storageKey,
        value: JSON.stringify(g)
    });
}

let GameContext = createContext({} as Game);

/**
 * Context provider to get game information from capacitor storage
 */
function GameContextProvider(props : {children: React.ReactNode; }) {
    
    const [initialGame, setInitialGame] = useState({} as Game);

    useEffect(() => {
        Promise.resolve(Storage.get({key: storageKey}).then(
            (result) => {
                if(typeof result.value === 'string') {
                    setInitialGame(JSON.parse(result.value) as Game);
                }
            },
            (reason) => console.log("Failed to load game from storage because of:" + reason)
        ));
    }, []);

    return (
        <GameContext.Provider value={initialGame}>{props.children}</GameContext.Provider>
    )
}

let GameContextConsumer = GameContext.Consumer;

export { GameContext, GameContextProvider, GameContextConsumer};