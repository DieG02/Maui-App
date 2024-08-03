import React from 'react';
import { View, ScrollView } from 'react-native';
import customStyles from '../../../styles/customStyles';
import styles from './style';
import { IFinancialAccount } from '../../../types/types';
import AccountCard from '../AccountCard';
import NewAccountCard from '../NewAccountCard';

const { width, marginHorizontal } = customStyles;

interface Props {
  data: IFinancialAccount[];
}

const MultipleAccounts = ({ data }: Props) => {
  return (
    <ScrollView
      horizontal
      overScrollMode='never'
      showsHorizontalScrollIndicator={false}
      snapToInterval={width / 1.5 + 15}
      decelerationRate={0.5}
    >
      <View style={styles.wrapper}>
        {data.map((account: IFinancialAccount, i: number) => {
          return <AccountCard key={account.id} account={account} left={i === 0 ? marginHorizontal : 15} />;
        })}
        <NewAccountCard left={15} right={marginHorizontal} />
      </View>
    </ScrollView>
  );
};

export default MultipleAccounts;
