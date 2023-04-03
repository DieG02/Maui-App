import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const customStyles = {
  mainColor: "#3784F9",
  background: "#ffff",
  background2: "#f3f6f8",
  textBlack: "#292D38",
  textLight: "#BDC0C3",
  marginHorizontal: 30,

  iconColor: "#292D38",
  income: "#33E69B",
  incomeLight: "#99FFD4",
  expense: "#FD6363",
  expenseLight: "#FFCCCC",
  orange: "#FF8000",
  orangeLight: "#FFEFEF",
  item: "#3784F9",
  itemLight: "#EBF3FF",
  white: "#ffff",

  // TODO: Define the rest of the colors here.
  disabled: "#b3b3b3",
  secondaryColor: "#F8F8F8",
  // secondaryColorBorder: "#f8f8f8",
  secondaryColorBorder: "#EAEAEA",
  textBlue: "#7888A8",
  textOutline: "#717171",
  width: width,
  height: height,

  positive: "#48BB8B",

  ligthBlue: "#E6EFF8"
};

export default customStyles;
