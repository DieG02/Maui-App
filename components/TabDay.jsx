import React from "react";
import { View, ScrollView, Dimensions, Text } from "react-native";
import Frame from "../components/Frame";
import BalanceCard from "../components/BalanceCard";
import BlockState from "../components/BlockState";
import Title from "../components/Title";
import theme from "../styles/themeStyles";
import Spacer from "../components/Spacer";
import Fab from "./Fab";
import { balance } from "../helpers/seed";
import Modal from "./Modal";

const { width } = Dimensions.get("window");

function TabDay() {
  return (
    <ScrollView
      vertical
      style={{ backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ marginVertical: 20, backgroundColor: "white" }}>
        <Title title="Hoy" />
        <Spacer height={20} />
        <View
          style={{
            marginHorizontal: 30,
            marginBottom: 30,
          }}
        >
          {balance.map((i) => (
            <Modal
              key={i.id}
              name={i.name}
              price={i.price}
              type={i.type}
              state={i.state}
              onPress={() => alert("Hola")}
              color={i.color}
              icon={i.icon}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
export default TabDay;
