import React from 'react';
import {TouchableOpacity} from 'react-native';

export interface TouchProps {
  style?: object;
  onPress?: Function;
  disabled?: boolean;
  children?: React.ReactNode;
  activeOpacity?: number;
}

const Touch = ({
  style = {},
  onPress = () => {},
  disabled = false,
  children,
  activeOpacity = 0.8,
}: TouchProps) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      underlayColor="transparent"
      style={[style, disabled ? {opacity: 0.5} : {}]}
      onPress={onPress}
      disabled={disabled}>
      {children}
    </TouchableOpacity>
  );
};

export default Touch;
