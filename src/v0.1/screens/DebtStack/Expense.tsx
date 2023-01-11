import React from "react";
import ScreenContainer from "../../components/containers/ScreenContainer";
import { BackHeaderTitle } from "../../components/common/HeaderTitle";
import SummaryDebt from "../../components/common/SummaryDebt";
import { View, ScrollView } from "react-native";
import customStyles from "../../styles/customStyles";
import DebtContactCard from "../../components/common/DebtContactCard";
import { expense } from "../../services/debts";

const { background } = customStyles;

interface Props {
  navigation: any
}

const ExpenseDebt = () => {
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
          
          <DebtContactCard data={expense} type="provider" onPress={() => {}} />
          <DebtContactCard data={expense} type="provider" onPress={() => {}} />
        </ScrollView>
        <SummaryDebt type="expense" amount={5600} clients={4}/>
      </View>
    );
  };

export default ExpenseDebt;
