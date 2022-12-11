import { StyleSheet } from "react-native";
import customStyles from "../../../styles/customStyles";

const { background, background2, textLight } = customStyles;

const styles = (align?: string, color?: string) =>
  StyleSheet.create({
    wrapper: {
      height: 50,
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: background,
    },
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    textContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: align === "left" ? "flex-start" : "flex-end",
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: background2,
      marginRight: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    textTitle: {
      fontSize: 18,
      fontFamily: "Gilroy-Medium",
      color: color,
    },
    textSubtitle: {
      fontSize: 15,
      fontFamily: "Gilroy-Regular",
      color: textLight,
    },
  });

export default styles;
