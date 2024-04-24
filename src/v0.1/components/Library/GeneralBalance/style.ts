import { StyleSheet } from 'react-native';
import customStyles from '../../../styles/customStyles';

const { marginHorizontal, background2, textBlack } = customStyles;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: marginHorizontal,
    backgroundColor: background2,
    borderRadius: 15,
    height: 100,
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
  },
  text: {
    fontSize: 18,
    color: textBlack,
    fontFamily: 'Gilroy-Regular',
  },
  textPrice: {
    fontSize: 30,

    color: textBlack,
    fontFamily: 'Gilroy-SemiBold',
  },
});

export default styles;
