import { Image, Text, View } from 'react-native';
import React from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import ScreenContainer from '../../components/containers/ScreenContainer';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import customStyles from '../../styles/customStyles';
import RowTransaction from '../../components/common/TransactionCard/RowTransaction';
import ScrollContainer from '../../components/containers/ScrollContainer';
import { parseDDMMYY } from '../../utils/helper';
import Button from '../../components/common/Button';
import { useTranslation } from 'react-i18next';
import LoadingComponent from '../../components/Library/LoadingComponent';
import useGetTransactionById from '../../services/Transactions/useGetTransactionById';
import { alertDelete } from '../../utils/alerts';

const { secondaryColor, textBlack, marginHorizontal, mainColor, navyBlue, babyBlue } = customStyles;
interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
}

const DebtDetail = ({ route, navigation }: Props) => {
  const { params } = route;
  const { t } = useTranslation();

  const handleDelete = () => {
    alertDelete(t('balance_stack.transaction_detail.alert_delete'), () => console.log('eliminado'));
  };

  const options = [
    {
      label: 'Editar Transacción',
      id: 1,
      fn: () => console.log('Editado'),
    },
    { label: 'Eliminar Transacción', id: 2, fn: () => handleDelete() },
  ];

  const { data, isLoading } = useGetTransactionById(params?.id, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const handleOnPress = () => navigation.navigate('IndividualPayment', { debtId: data.debtId, type: data.type });

  if (isLoading) return <LoadingComponent color={mainColor} />;

  return (
    <ScreenContainer>
      <BackHeaderTitle
        label={t('debt_stack.debt_detail.title')}
        onPressBack={() => navigation.goBack()}
        withOptions
        options={options}
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
                uri: data.category?.image,
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
        <RowTransaction
          label={t('debt_stack.debt_detail.payment_method')}
          value={params?.type === 'debt' ? t('balance_stack.state_options.debt') : data.payment_method}
        />
        <RowTransaction
          label={t('debt_stack.debt_detail.total')}
          value={
            params?.type === 'debt' ? (
              <Text numberOfLines={1}>
                {data.total_amount?.toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                })}
              </Text>
            ) : (
              <Text numberOfLines={1}>
                -
                {data?.total_amount.toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                })}
              </Text>
            )
          }
        />
        <RowTransaction label={t('debt_stack.debt_detail.operation_type')} value={data.type} />
        <RowTransaction label={t('debt_stack.debt_detail.expense_category')} value={data?.category?.name} />
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
            color={navyBlue}
            style={{
              backgroundColor: babyBlue,
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
