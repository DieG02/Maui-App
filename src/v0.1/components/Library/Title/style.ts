import { StyleSheet } from "react-native";
import customStyles from "../../../styles/customStyles";

const { marginHorizontal, background, textBlack, mainColor } = customStyles;

const styles = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: marginHorizontal,
    backgroundColor: background,
  },
  text: {
    fontSize: 18,
    color: textBlack,
    fontFamily: "Gilroy-SemiBold",
  },
  textAction: {
    color: mainColor,
    fontFamily: "Gilroy-Bold",
    fontSize: 14,
    textTransform: "uppercase",
  },
});

export default styles;
