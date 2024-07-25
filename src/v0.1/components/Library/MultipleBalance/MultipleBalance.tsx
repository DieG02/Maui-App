import React from 'react';
import { View, ScrollView } from 'react-native';
import customStyles from '../../../styles/customStyles';
import styles from './style';
import { useTranslation } from 'react-i18next';
import { IBalance, IFinancialAccount } from '../../../types/types';
import AccountBalanceCard from '../AccountBalanceCard/AccountBalanceCard';

const { width, marginHorizontal } = customStyles;

interface Props {
  data: IBalance;
}

const MultipleBalance = ({ data }: Props) => {
  const { t } = useTranslation();
  const accounts = data.financialAccounts;

  return (
    <ScrollView
      horizontal
      overScrollMode='never'
      showsHorizontalScrollIndicator={false}
      snapToInterval={width / 1.5 + 15}
      decelerationRate={0.5}
    >
      <View style={styles.wrapper}>
        <View>
          <View style={styles.wrapper}>
            {accounts.map((account: IFinancialAccount, i: number) => {
              return (
                <AccountBalanceCard
                  key={account.id}
                  account={account}
                  left={i === 0 ? marginHorizontal : 15}
                  right={i === accounts.length - 1 ? marginHorizontal : 0}
                />
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MultipleBalance;
