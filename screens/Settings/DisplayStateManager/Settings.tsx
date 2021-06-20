import React from 'react';
import { updateSettings, updateSettingCurrency } from "../Logic/SettingsHelper";
import { SettingsState, defaultSettings, getSettings } from '../../../states/SettingsState';
import SettingsDisplayComponent from '../DisplayComponent/SettingsComponent';

class Settings extends React.Component<{}, SettingsState> {

  constructor(props : any) {
    super(props);
    this.state = defaultSettings;
  }

  async componentDidMount() {
    this.setState(await getSettings());
  }

  async updateSettingsValue(key : string, value : number) {
    await updateSettings(key,value);
    getSettings().then(e => {
      this.setState(e);
    });
  }
  async updateSettingsValueCurrency(value : string) {
    await updateSettingCurrency(value);
    getSettings().then(e => {
      this.setState(e);
    });

  }


  render() {
    return (
      <SettingsDisplayComponent state={this.state} main={this}/>
    );
  }
}

export default Settings;