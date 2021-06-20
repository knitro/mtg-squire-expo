import { getSettings, SettingsState, saveSettings } from "../../../states/SettingsState";

/**
 * Updates a single setting (of number type) and stores new settings to storage
 * @param setting - string identifier of setting which is changed
 * @param value - new value of setting which is stored
 */
export async function updateSettings(setting : string, value : number) {
  var settings : SettingsState = await getSettings();

  if ('searchStored'.localeCompare(setting) === 0) {
    settings.searchStored = value;
  } else if ('diceStored'.localeCompare(setting) === 0) {
    settings.diceStored = value;
  }
  saveSettings(settings);
}

/**
 * Updates the currency setting value and stores new settings to storage
 * @param value - new value of currency which is stored
 */
export async function updateSettingCurrency(value : string) {
  var settings : SettingsState = await getSettings();
  settings.currency = value;
  saveSettings(settings);
  console.log(value);
}