import { StyleSheet } from "react-native";

const styles = (align?: string) =>
  StyleSheet.create({
    wrapper: {
      width: 50,
      height: 50,
      justifyContent: "center",
      alignItems: align === "left" ? "flex-start" : "flex-end",
    },
  });

export default styles;
