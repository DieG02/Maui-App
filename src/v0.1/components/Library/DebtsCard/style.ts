import { StyleSheet } from "react-native";
import customStyles from "../../../styles/customStyles";

const { background, background2, textLight } = customStyles;

const styles = (align?: string, color?: string) =>
  StyleSheet.create({
    wrapper: {
      height: 50,
      width: "100%",
      marginTop: 8,
      marginBottom: 10,
      backgroundColor: background,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    leftContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      width: '65%'
    },
    rightContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      width: '35%'
    },
    textContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: '100%',
      alignItems: align === "left" ? "flex-start" : "flex-end"
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
    titleCard: {
      fontSize: 18,
      fontFamily: "Gilroy-Medium",
      color: color,
      width: '70%'
    },
    textSubtitle: {
      fontSize: 15,
      fontFamily: "Gilroy-Regular",
      color: textLight,
    },
  });

export default styles;
