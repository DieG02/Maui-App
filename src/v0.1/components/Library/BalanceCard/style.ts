import { StyleSheet } from 'react-native';
import customStyles from '../../../styles/customStyles';

const { width, background2, textBlack, itemLight, iconBlue } = customStyles;

interface Props {
  left?: number | undefined;
  right?: number | undefined;
  selected: boolean;
  background?: string | undefined;
}

const styles = ({ left, right, selected, background }: Props) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: selected ? itemLight : background2,
      width: width / 1.5,
      borderRadius: 15,
      marginLeft: left,
      marginRight: right,
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      marginHorizontal: 20,
    },
    subWrapper: {
      height: 30,
      justifyContent: 'center',
    },
    textLabel: {
      color: textBlack,
      fontSize: 18,
      fontFamily: 'Gilroy-Regular',
      marginBottom: 5,
    },
    textValue: {
      color: textBlack,
      fontSize: 18,
      marginBottom: 6,
      fontFamily: 'Gilroy-SemiBold',
    },
    iconStyle: {
      width: 50,
      height: 50,
      marginVertical: 5,
      borderRadius: 30,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: background,
    },
  });

export default styles;
