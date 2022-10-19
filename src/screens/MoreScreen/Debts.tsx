import React from "react";
import ScreenContainer from "../../components/containers/ScreenContainer";
import Button from "../../components/common/Button";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import { NavigationProp } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text, View, Dimensions } from "react-native";
import globalStyles from "../../styles/globalStyles";

const { width } = Dimensions.get("window");
interface Props {
  navigation: NavigationProp<any, any>;
}

const { mainColor, background, textLight, secondaryColor } = globalStyles;

const Tab = createMaterialTopTabNavigator();

const IncomeDebt = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: background,
      }}
    >
      <View
        style={{
          marginTop: 20,
          backgroundColor: background,
        }}
      >
        <View
          style={{
            backgroundColor: secondaryColor,
          }}
        >
          <Text style={{color:"black"}}> Deudas por cobrar</Text>
        </View>
      </View>
    </View>
  );
};
const ExpenseDebt = ({navigation}:Props) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: background,
      }}
    >
      <View
        style={{
          marginTop: 20,
          backgroundColor: background,
        }}
      >
        <Button onPress={()=>navigation.navigate("NewIncome")} text="Pagar" style={{backgroundColor: "#dbdbdb", width: (width - 60) / 2,}}/>
      </View>
    </View>
  );
};

const Debts = ({ navigation }: Props) => {
  return (
    <ScreenContainer>
      <BackHeaderTitle label="Deudas" onPressBack={() => navigation.goBack()} />
      <Tab.Navigator
        style={{ backgroundColor: background }}
        overScrollMode="never"
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
            marginBottom: 6,
          },
          tabBarStyle: {
            elevation: 0,
            marginHorizontal: 25,
          },
          tabBarPressColor: "white",
          tabBarActiveTintColor: mainColor,
          tabBarInactiveTintColor: textLight,
          tabBarIndicatorStyle: {
            backgroundColor: mainColor,
            height: 3,
          },
        }}
      >
        <Tab.Screen name="Por Cobrar" component={IncomeDebt} />
        <Tab.Screen name="Por Pagar" component={ExpenseDebt} />
      </Tab.Navigator>
    </ScreenContainer>
  );
};

export default Debts;
