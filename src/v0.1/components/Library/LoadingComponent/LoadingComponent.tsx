import { View, ActivityIndicator } from "react-native";
import React from "react";
import styles from "./style";

type props = React.FC<Props & React.ComponentProps<typeof View>>;

interface Props {
  color?: string;
}

const LoadingComponent: props = ({ color, ...otherProps }) => {
  return (
    <View style={styles.wrapper} {...otherProps}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
};

export default LoadingComponent;
