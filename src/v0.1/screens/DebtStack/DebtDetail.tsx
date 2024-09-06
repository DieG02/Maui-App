import { NavigationProp, RouteProp } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Button from '../../components/common/Button';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import RowTransaction from '../../components/common/RowTransaction';
import ScreenContainer from '../../components/containers/ScreenContainer';
import ScrollContainer from '../../components/containers/ScrollContainer';
import LoadingComponent from '../../components/Library/LoadingComponent';
import { GET_GENERAL_BALANCE_KEY } from '../../services/Balance/useGeneralBalance';
import { GET_MONTHLY_STATS_KEY } from '../../services/Balance/useGetStats';
import useDeleteDebt from '../../services/Debts/useDeleteDebtId';
import { GET_DEBTS_KEY } from '../../services/Debts/useGetAllDebts';
import { GET_TRANSACTIONS_KEY } from '../../services/Transactions/useGetAllTransactions';
import useGetTransactionById from '../../services/Transactions/useGetTransactionById';
import customStyles from '../../styles/customStyles';
import { parserToCurrency } from '../../utils/adapter';
import { alertDelete } from '../../utils/alerts';
import { parseDDMMYY } from '../../utils/helper';
import { queryClient } from '../../utils/queryClient';

const { secondaryColor, textBlack, marginHorizontal, mainColor, background2 } = customStyles;
interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
}

const DebtDetail = ({ route, navigation }: Props) => {
  const { params } = route;
  const { t } = useTranslation();

  const { data, isLoading } = useGetTransactionById(params?.id, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const showToast = () => {
    Toast.show({
      type: 'success',
      text2: t('balance_stack.transaction_detail.toast_transaction_delete'),
      position: 'bottom',
      visibilityTime: 1000,
    });
  };

  const { mutateAsync: deleteTransaction, isLoading: isDeleting } = useDeleteDebt(data?.debtId as string, {
    onSuccess() {
      showToast();
      queryClient.invalidateQueries(GET_TRANSACTIONS_KEY);
      queryClient.invalidateQueries(GET_GENERAL_BALANCE_KEY);
      queryClient.invalidateQueries(GET_MONTHLY_STATS_KEY);
      queryClient.invalidateQueries(GET_DEBTS_KEY);
      navigation.navigate('HomeTabs', { screen: 'Debts' });
    },
  });

  const handleDelete = () => {
    alertDelete(t('balance_stack.transaction_detail.alert_delete'), deleteTransaction);
  };

  if (isLoading || isDeleting || !data) return <LoadingComponent color={mainColor} />;

  const handleOnPress = () =>
    navigation.navigate('IndividualPayment', { debtId: data?.debtId, type: data?.type, contact: data?.contact?.id });

  return (
    <ScreenContainer>
      <BackHeaderTitle
        label={t('debt_stack.debt_detail.title')}
        onPressBack={() => navigation.goBack()}
        onPressDelete={handleDelete}
        withDelete
      />
      <ScrollContainer>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 30,
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: secondaryColor,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 20,
            }}
          >
            <Image
              source={{
                uri: data?.category?.image,
              }}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 24,
              color: textBlack,
              fontFamily: 'Gilroy-SemiBold',
            }}
            numberOfLines={1}
          >
            {data?.description
              ? data.description
              : `${t('debt_stack.debt_detail.deposit_date')} ${parseDDMMYY(data.date)}`}
          </Text>
        </View>
        <RowTransaction label={t('debt_stack.debt_detail.date')} value={parseDDMMYY(data.date)} />

        {data.payment_method !== 'NONE' && (
          <RowTransaction
            label={t('debt_stack.debt_detail.payment_method')}
            value={params?.type === 'debt' ? t('balance_stack.state_options.debt') : data.payment_method}
          />
        )}

        <RowTransaction
          label={t('debt_stack.debt_detail.total')}
          value={
            params?.type === 'debt' ? (
              <Text numberOfLines={1}>
                {parserToCurrency(
                  data?.total_amount,
                  data?.financialAccount?.currency.locale,
                  data?.financialAccount?.currency.code
                )}
              </Text>
            ) : (
              <Text numberOfLines={1}>
                -
                {parserToCurrency(
                  data?.total_amount,
                  data?.financialAccount?.currency.locale,
                  data?.financialAccount?.currency.code
                )}
              </Text>
            )
          }
        />

        <RowTransaction label={t('debt_stack.debt_detail.operation_type')} value={data.type} />
        {data?.category?.name !== 'Venta' && (
          <RowTransaction label={t('debt_stack.debt_detail.expense_category')} value={data?.category?.name} />
        )}

        <RowTransaction
          label={t('debt_stack.debt_detail.to_pay')}
          value={
            <Text
              numberOfLines={1}
              style={{
                textDecorationLine: 'underline',
                color: mainColor,
              }}
            >
              {parserToCurrency(
                params?.actualAmount,
                data?.financialAccount?.currency.locale,
                data?.financialAccount?.currency.code
              )}
            </Text>
          }
        />
      </ScrollContainer>
      {data.status === 'DEBT' && (
        <View
          style={{
            justifyContent: 'center',
            marginHorizontal: marginHorizontal,
            marginBottom: 40,
          }}
        >
          <Button
            text={t('debt_stack.debt_detail.to_pay')}
            color={mainColor}
            style={{
              backgroundColor: background2,
              marginTop: 10,
            }}
            onPress={handleOnPress}
          />
        </View>
      )}
    </ScreenContainer>
  );
};

export default DebtDetail;
