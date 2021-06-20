import React from 'react';
import './SetEVs.css';
import Overlay from '../../components/Overlay/Overlay';
import WorkInProgress from '../../components/WorkInProgress/WorkInProgress';
import { View } from 'react-native';

const SetEVs: React.FC = () => {
  return (
    
    <View>

      {/* Displays the Header */}
      <Overlay headerLabel="SetEVs"/>

      <View>

        <WorkInProgress name={"SetEVs"}/>

      </View>

    </View>
  );
};

export default SetEVs;
