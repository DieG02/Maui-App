import { StyleSheet } from 'react-native';
import customStyles from '../../../styles/customStyles';

const { mainColor, background2 } = customStyles;

const styles = (size: string) =>
  StyleSheet.create({
    image: {
      width: size === 'large' ? 100 : 50,
      height: size === 'large' ? 100 : 50,
      borderRadius: size === 'large' ? 100 : 50,
    },
    wrapper: {
      width: size === 'large' ? 100 : 50,
      height: size === 'large' ? 100 : 50,
      borderRadius: size === 'large' ? 100 : 50,
      backgroundColor: background2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: size === 'large' ? 36 : 18,
      fontFamily: size === 'large' ? 'Gilroy-SemiBold' : 'Gilroy-ExtraBold',
      color: mainColor,
    },
  });

export default styles;
