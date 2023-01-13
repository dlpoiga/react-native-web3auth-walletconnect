import {StyleSheet} from 'react-native';
import colors from '../../themes/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightgray,
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  blank: {
    flex: 1,
  },
  qrContainer: {
    backgroundColor: colors.gray,
    height: 30,
    width: 30,
    borderRadius: 9,
    marginRight: 15,
  },
  profileContainer: {
    backgroundColor: '#FED8A9',
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  balanceContainer: {
    alignItems: 'center',
  },
  amountBalanceContainer: {
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 0,
  },
  iconAmountBalance: {
    width: 20,
    height: 20,
    backgroundColor: '#F7931A',
    opacity: 0.2,
    borderRadius: 10,
  },
  textAmountBalance: {
    fontWeight: '700',
    fontSize: 24,
    marginLeft: 12,
    color: colors.white,
  },
  labelBalanceContainer: {
    borderRadius: 10,
    backgroundColor: '#222222',
    paddingVertical: 2,
    paddingHorizontal: 9,
    zIndex: 1,
    marginTop: -9,
  },
  textLabelBalanceContainer: {
    color: colors.white,
    fontSize: 10,
    textAlign: 'center',
  },
  rowActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 60,
  },
  containerAction: {
    alignItems: 'center',
  },
  buttonAction: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.darkgray,
  },
  labelAction: {
    textAlign: 'center',
    fontSize: 10,
    color: colors.white,
    marginTop: 6,
  },
  containerToggle: {
    flexDirection: 'row',
    marginTop: 32,
    marginBottom: 24,
    backgroundColor: '#1F1F1F',
    borderRadius: 100,
    height: 47,
  },
  buttonToggle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 100,
  },
  labelToggle: {
    textAlign: 'center',
    color: colors.gray,
    fontSize: 12,
  },
  purpleBg: {
    backgroundColor: colors.purple,
  },
  whiteTxt: {
    color: colors.white,
  },
  listContainer: {
    flex: 1,
  },
  itemList: {
    backgroundColor: '#1F1F1F',
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  iconContainerItem: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F7931A',
    marginRight: 20,
    opacity: 0.2,
  },
  namesContainerItem: {
    marginRight: 20,
  },
  nameItem: {
    color: colors.white,
    fontSize: 14,
  },
  subNameItem: {
    color: colors.gray,
    fontSize: 14,
    marginTop: 3,
  },
  graphContainerItem: {
    flex: 1,
  },
  numbersContainerItem: {
    marginLeft: 20,
  },
  priceItem: {
    fontSize: 10,
    color: colors.white,
    textAlign: 'right',
  },
  rateItem: {
    fontSize: 10,
    color: '#61E7A6',
    textAlign: 'right',
    marginTop: 3,
  },
});

export default styles;
