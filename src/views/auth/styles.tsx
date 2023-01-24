import {StyleSheet} from 'react-native';
import colors from '../../themes/colors';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: colors.lightgray,
  },
  scroll: {
    backgroundColor: colors.lightgray,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightgray,
  },
  image: {
    width: 295,
    marginBottom: 40,
  },
  title: {
    textAlign: 'left',
    width: '75%',
    fontSize: 24,
    marginBottom: 10,
    color: colors.white,
    fontWeight: '700',
    lineHeight: 29,
  },
  description: {
    textAlign: 'left',
    width: '75%',
    fontSize: 14,
    marginBottom: 20,
    color: colors.gray,
    lineHeight: 17,
  },
  button: {
    ...colors.shadow,
    backgroundColor: colors.purple,
    paddingVertical: 14,
    width: '75%',
    borderRadius: 6,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.purple,
  },
  labelButton: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: colors.darkgray,
  },
  secondaryLabel: {
    color: colors.purple,
  },
});

export default styles;
