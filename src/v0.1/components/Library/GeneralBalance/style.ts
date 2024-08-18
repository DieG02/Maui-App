import { StyleSheet } from 'react-native';
import customStyles from '../../../styles/customStyles';

const { marginHorizontal, background2, textBlack } = customStyles;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: marginHorizontal,
    backgroundColor: background2,
    borderRadius: 15,
    // height: 120,
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    marginVertical: 5,
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

  button: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 4,
    borderColor: background2,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
  },
  buttonLabel: {
    fontSize: 16,
    color: textBlack,
    fontFamily: 'Gilroy-SemiBold',
  },
});

export default styles;
