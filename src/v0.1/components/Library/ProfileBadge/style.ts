import { StyleSheet } from "react-native";
import customStyles from "../../../styles/customStyles";

const { mainColor } = customStyles;

const styles = (size: string) =>
  StyleSheet.create({
    image: {
      width: size === "large" ? 100 : 45,
      height: size === "large" ? 100 : 45,
      borderRadius: size === "large" ? 100 : 45,
    },
    wrapper: {
      width: size === "large" ? 100 : 45,
      height: size === "large" ? 100 : 45,
      borderRadius: size === "large" ? 100 : 45,
      backgroundColor: mainColor,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontSize: size === "large" ? 36 : 18,
      fontFamily: size === "large" ? "Gilroy-SemiBold" : "Gilroy-Medium",
      color: "white",
    },
  });

export default styles;
