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
    // color: "#131313",
    color: "#60708F",
  },
  h1: {
    fontSize: 17,
 
    color: "#60708F",
    fontFamily:'Gilroy-Bold',
  },
  p: {
    fontSize: 15,
    // color: "#ACACAC",
    fontFamily: "Gilroy-Regular",
    color: "#D7DCE4",
    
  },
  p1: {
    fontSize: 15,
    fontFamily: "Gilroy-Regular",
    color: "#D7DCE4",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
};
