import React from "react";
import { StyleSheet, Text, View } from "react-native";
import globalStyles from "../../styles/globalStyles";

const { secondaryColor } = globalStyles;

interface Props {
  name: string;
  icon?: JSX.Element;
  color?: string;
  titleColor?: string;
  children?: React.ReactNode;
}

const Header = ({ name, children, icon, color, titleColor }: Props) => {
  const styles = StyleSheet.create({
    root: {
      backgroundColor: color || "white",
      height: 60,
      justifyContent: "center",
    },
    container: {
      marginHorizontal: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    containerIcons: {
      display: "flex",
      flexDirection: "row",
    },
    icons: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 5,
    },
    title: {
      fontSize: 22,
      fontFamily: "Gilroy-Bold",
      paddingLeft: 10,
      color: titleColor || secondaryColor,
    },
  });

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {icon}
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={styles.containerIcons}>{children}</View>
      </View>
    </View>
  );
};

export default Header;
