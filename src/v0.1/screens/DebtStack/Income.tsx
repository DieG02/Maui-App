import React from "react";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import SummaryDebt from "../../components/common/SummaryDebt";
import { View, ScrollView } from "react-native";
import customStyles from "../../styles/customStyles";
import DebtContactCard from "../../components/common/DebtContactCard";
import { income, expense } from "../../services/debts";
import { useNavigation } from "@react-navigation/native";

const { background } = customStyles;

interface Props {
  navigation: any
}

const IncomeDebt = () => {
    const navigation = useNavigation();
  
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: background,
        }}
      >
        <ScrollView
          style={{
            marginTop: 20,
            backgroundColor: background,
          }}
        >
          <DebtContactCard data={income} type="client" onPress={() => {}} />
          <DebtContactCard data={income} type="client" onPress={() => {}} />
          <DebtContactCard data={income} type="client" onPress={() => {}} />
          <DebtContactCard data={income} type="client" onPress={() => {}} />
          <DebtContactCard data={income} type="client" onPress={() => {}} />
          <DebtContactCard data={income} type="client" onPress={() => {}} />
          <DebtContactCard data={income} type="client" onPress={() => {}} />
          <DebtContactCard data={income} type="client" onPress={() => {}} />
          <DebtContactCard data={income} type="client" onPress={() => {}} />
          <DebtContactCard data={income} type="client" onPress={() => {}} />
          <DebtContactCard data={income} type="client" onPress={() => {}} />
          <DebtContactCard data={income} type="client" onPress={() => {}} />
          <DebtContactCard data={expense} type="provider" onPress={() => navigation.navigate("DebtorScreen")} />
        </ScrollView>
        <SummaryDebt type="income" amount={3500} clients={6} />
      </View>
    );
};

export default IncomeDebt;
