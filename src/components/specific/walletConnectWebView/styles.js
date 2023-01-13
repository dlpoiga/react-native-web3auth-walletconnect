import {StyleSheet} from 'react-native';
import colors from '../../../themes/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0, 0.75)',
  },
  containerbutton: {
    backgroundColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginHorizontal: 30,
    borderRadius: 30,
    marginVertical: 12,
  },
  textButton: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default styles;
