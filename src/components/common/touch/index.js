import React from 'react';
import {TouchableOpacity} from 'react-native';

const Touch = ({
  style = {},
  onPress = () => {},
  disabled = false,
  children,
  activeOpacity = 0.8,
}) => {
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
