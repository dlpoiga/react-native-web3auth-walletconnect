import {StyleSheet} from 'react-native';
import colors from '../../themes/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  header: {
    paddingVertical: 12,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.white,
    flex: 1,
  },
  buttonLogOut: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: 12,
  },
  textLogOut: {
    textAlign: 'center',
    color: colors.white,
  },
  body: {
    flex: 1,
    backgroundColor: colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  highlight: {
    fontWeight: '700',
  },
  emptyContainer: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  noAccountMsg: {
    textAlign: 'center',
    marginHorizontal: 60,
    fontSize: 18,
    marginBottom: 60,
  },
  OrSeparator: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 12,
    opacity: 0.5,
  },
});

export default styles;
