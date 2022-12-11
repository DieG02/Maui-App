import { StyleSheet } from "react-native";
import customStyles from "../../../styles/customStyles";

const { marginHorizontal, background, textBlack } = customStyles;

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    marginHorizontal: marginHorizontal,
    marginTop: 10,
    backgroundColor: background,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: background,
  },
  text: {
    fontSize: 18,
    fontFamily: "Gilroy-SemiBold",
    color: textBlack,
  },
});

export default styles;
