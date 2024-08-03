import { StyleSheet } from 'react-native';
import customStyles from '../../../styles/customStyles';

const { width, background2, textLight } = customStyles;

interface Props {
  left?: number | undefined;
  right?: number | undefined;
  background?: string | undefined;
}

const styles = ({ left, right, background }: Props) =>
  StyleSheet.create({
    wrapper: {
      width: width / 1.5,
      borderRadius: 15,
      marginLeft: left,
      marginRight: right,
      borderWidth: 3,
      borderColor: background2,
      height: 150,
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginVertical: 10,
      marginHorizontal: 20,
    },
    subWrapper: {
      marginTop: 20,
      height: 30,
      justifyContent: 'center',
    },
    icon: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 5,
      width: 45,
      height: 45,
      borderRadius: 30,
      marginRight: 10,
      backgroundColor: background2,
    },
    textValue: {
      color: textLight,
      fontSize: 18,
      marginBottom: 6,
      fontFamily: 'Gilroy-SemiBold',
    },
  });

export default styles;
