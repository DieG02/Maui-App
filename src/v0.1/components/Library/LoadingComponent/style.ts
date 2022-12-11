import { StyleSheet } from "react-native";
import customStyles from "../../../styles/customStyles";

const { background } = customStyles;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: background,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
