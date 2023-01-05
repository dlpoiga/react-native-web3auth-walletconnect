import React from 'react';
import {ActivityIndicator, View, StyleSheet, Dimensions} from 'react-native';
import {Store} from '../../../hooks/main_store';
import colors from '../../../themes/colors';

const Spinner = props => {
  const {state} = React.useContext(Store);
  const {width, height} = Dimensions.get('screen');
  const styles = StyleSheet.create({
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
  return state.loading ? (
    <View style={[styles.loader, props.style]}>
      <ActivityIndicator animating={true} size={'small'} />
    </View>
  ) : null;
};

export default Spinner;
