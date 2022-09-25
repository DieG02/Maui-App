import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const globalStyles = {
  mainColor: "#3784F9",
  // secondaryColor: "#60708F",
  secondaryColor: "#3a3a3a",
  textBlack: "#191919",
  width: width,
  height: height,
  background: "#ffff",
  white: "#fff",
  marginHorizontal: 30,
  income: "#33E69B",
  incomeLight: "#99FFD4",
  expense: "#FD6363",
  expenseLight: "#FFCCCC",
  orange: "#FF8000",
  orangeLight: "#FFC48A",
  item: "#3784F9",
  itemLight: "#BED8FF",
  balanceCard: "#F8F8F8",
  balanceCardBorder: "#ECECEC",
};

export default globalStyles;
