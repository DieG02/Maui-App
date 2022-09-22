import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const globalStyles = {
  mainColor: "#3784F9",
  // secondaryColor: "#60708F",
  secondaryColor: "#3a3a3a",
  width: width,
  height: height,
  background: "#ffff",
  marginHorizontal: 30,
};

export default globalStyles;
