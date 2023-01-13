import {Dimensions} from 'react-native';
import colors from './colors';

const commons = {
  fullSize: {
    flex: 1,
  },
  fullSize2: {
    height: '100%',
    width: Dimensions.get('window').width,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  textWhite: {
    color: colors.white,
  },
  textBlack: {
    color: colors.black,
  },
  textBlue: {
    color: colors.lightblue,
  },
  bgblack: {
    backgroundColor: colors.black,
  },
  firstLbl: {
    textAlign: 'center',
    marginHorizontal: 24,
    marginVertical: 18,
    fontSize: 12,
  },
  barSeparate: {
    backgroundColor: colors.black,
    padding: 10,
    marginBottom: 18,
  },
  txtBarSeparate: {
    color: colors.white,
    fontSize: 12,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
};

export default commons;
