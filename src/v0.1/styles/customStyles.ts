import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const customStyles = {
  // mainColor: "#003A64",
  mainColor: '#3175DC',
  // mainColor: "#2E6DCE",

  background: '#ffff',
  background2: '#f3f6f8',
  // textBlack: "#171710",
  textBlack: '#313643',
  textLight: '#767778',
  marginHorizontal: 30,

  iconColor: '#292D38',
  income: '#24A46F',
  incomeLight: '#A0F3D0',
  expense: '#F35F5F',
  expenseLight: '#FFDADA',
  // orange: '#E27200',
  // orangeLight: '#FFDDBA',
  itemLight: '#D3E4FE',
  white: '#ffff',

  iconBlue: '#275DAF',

  // New Pallete

  selectedItem: '#E9F1FE', // TODO: Merge with itemLight
  disabled: '#b3b3b3',
  secondaryColor: '#F8F8F8',
  positive: '#24A46F',
  secondaryColorBorder: '#EAEAEA',
  ligthBlue: '#D4F1F4',
  blueSelected: '#737373',
  babyBlue: '#E1ECF0',
  width: width,
  height: height,

  // item: '#4A90FA',
  // textBlue: '#7888A8',
  // textOutline: '#717171',
  // blueGreen: '#75E6DA',
  // royalBlue: '#0074B7',
  // mistyBlue: '#B0B7C0',
  // blueGrotto: '#54A2D2',
  // aquamarine: '#A9CEE8',
  // navyBlue: '#003A64',
};

export default customStyles;
