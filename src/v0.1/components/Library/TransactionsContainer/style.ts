import { StyleSheet } from "react-native";
import customStyles from "../../../styles/customStyles";

const { background, marginHorizontal } = customStyles;

const styles = StyleSheet.create({
  wrapper: { backgroundColor: background },
  container: {
    marginHorizontal: marginHorizontal,
  },
});

export default styles;
