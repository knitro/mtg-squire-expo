import React from 'react';
import { View } from 'react-native';
import './WorkInProgress.css';

interface ContainerProps {
  name: string;
}

const WorkInProgress: React.FC<ContainerProps> = ({ name }) => {
  return (
    <View>
      <strong>{"Development for " + name + " is a Work in Progress"}</strong>
    </View>
  );
};

export default WorkInProgress;
