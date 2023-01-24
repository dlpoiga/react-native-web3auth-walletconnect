import React from 'react';
import {ActivityIndicator, View, StyleSheet, Dimensions} from 'react-native';
import {Store} from '../../../hooks/main_store';
import colors from '../../../themes/colors';

export interface SpinnerProps {
  style?: object;
}

interface StylesProps {
  width: number;
  height: number;
  state: {opacity: number};
}

const returnStyles = ({width, height, state}: StylesProps) =>
  StyleSheet.create({
    loader: {
      position: 'absolute',
      width,
      height,
      zIndex: 20,
      opacity: state.opacity,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.white,
    },
    iconApp: {
      resizeMode: 'contain',
      width: 200,
      height: 200,
    },
  });

const Spinner = ({style}: SpinnerProps) => {
  const {state} = React.useContext(Store);
  const {width, height} = Dimensions.get('screen');
  const styles = returnStyles({width, height, state});

  return state.loading ? (
    <View style={[styles.loader, style]}>
      <ActivityIndicator animating={true} size={'small'} />
    </View>
  ) : null;
};

export default Spinner;
