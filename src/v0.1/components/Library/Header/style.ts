import { StyleSheet } from "react-native";
import customStyles from "../../../styles/customStyles";

const { background, marginHorizontal, textBlack } = customStyles;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: background,
    height: 60,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: marginHorizontal,
  },
  text: {
    fontSize: 22,
    fontFamily: "Gilroy-Bold",
    color: textBlack,
  },
});

export default styles;
