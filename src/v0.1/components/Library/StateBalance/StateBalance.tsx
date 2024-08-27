import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import customStyles from '../../../styles/customStyles';
import { IMontlyStats } from '../../../types/types';
import StateBalanceCard from '../StateBalanceCard';
import styles from './style';

const { width, marginHorizontal } = customStyles;

interface Props {
  data: IMontlyStats;
}

const StateBalance = ({ data }: Props) => {
  const { t } = useTranslation();
  return (
    <ScrollView
      horizontal
      scrollEnabled={false}
      overScrollMode='never'
      showsHorizontalScrollIndicator={false}
      snapToInterval={width}
      decelerationRate={0.5}
    >
      <View style={styles.wrapper}>
        <StateBalanceCard
          state={t('home_stack.monthly_summary.incomes')}
          value={data?.incomes}
          left={marginHorizontal}
          type='ingreso'
        />
        <StateBalanceCard
          state={t('home_stack.monthly_summary.expenses')}
          value={data?.expenses}
          left={15}
          type='egreso'
        />
        {/* <StateBalanceCard
              state={t('home_stack.monthly_summary.income_debts')}
              value={data?.toCollect}
              left={15}
              type='cobrar'
            />
            <StateBalanceCard
              state={t('home_stack.monthly_summary.expense_debts')}
              value={data?.debt}
              left={15}
              right={marginHorizontal}
              type='pagar'
            /> */}
      </View>
    </ScrollView>
  );
};

export default StateBalance;
