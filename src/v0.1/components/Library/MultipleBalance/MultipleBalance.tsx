import React from 'react';
import { View, ScrollView } from 'react-native';
import customStyles from '../../../styles/customStyles';
import styles from './style';
import { useTranslation } from 'react-i18next';
import { IFinancialAccount } from '../../../types/types';
import AccountBalanceCard from '../AccountBalanceCard/AccountBalanceCard';
import NewBalanceCard from '../NewBalanceCard';

const { width, marginHorizontal } = customStyles;

interface Props {
  data: IFinancialAccount[];
}

const MultipleBalance = ({ data }: Props) => {
  const { t } = useTranslation();

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
          return <AccountBalanceCard key={account.id} account={account} left={i === 0 ? marginHorizontal : 15} />;
        })}
        <NewBalanceCard left={15} right={marginHorizontal} />
      </View>
    </ScrollView>
  );
};

export default MultipleBalance;
