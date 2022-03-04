import { Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export default {
  root: {
    backgroundColor: "white",
  },
  tabScreen: {
    height: height - 60,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: 'red',
    alignItems: "center",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  text: {
    positive: "#26E595",
    negative: "#FD6363",
  },
  pBold: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  h2: {
    fontSize: 17,
    fontWeight: "500",
    color: "#131313",
  },
  h1: {
    fontSize: 17,
    fontWeight: "600",
    color: "#131313",
  },
  p: {
    fontSize: 15,
    color: "#ACACAC",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
};
