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

interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
}
const { secondaryColor, textBlack, marginHorizontal, mainColor, babyBlue } = customStyles;

const DebtDetail = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const { params } = route;

  const handleOnPress = () => {
    navigation.navigate('EditDebt', { params });
  };

  return (
    <ScreenContainer>
      <BackHeaderTitle
        label={t('debt_stack.debt_detail.title')}
        onPressBack={() => navigation.goBack()}
        withDelete
        onPressDelete={() => console.log('Borrar deuda')}
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
                uri: params?.item?.imageUrl
                  ? params?.item?.imageUrl
                  : 'https://cdn-icons-png.flaticon.com/512/1255/1255986.png?w=1380&t=st=1654300895~exp=1654301495~hmac=45b46434561dc28bf1924a2c7388c4835ac5f91b59a7ce3f624f943d80d7e98c',
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
            {params?.type === 'debt'
              ? params?.item.name
              : `${t('debt_stack.debt_detail.deposit_date')} ${parseDDMMYY(params?.item.paidAt)}`}
          </Text>
        </View>

        <RowTransaction label={t('debt_stack.debt_detail.operation_date')} value={parseDDMMYY(params?.item.paidAt)} />
        <RowTransaction
          label={t('debt_stack.debt_detail.payment_method')}
          value={params?.type === 'debt' ? t('balance_stack.state_options.debt') : params?.item.paymentMethod}
        />
        <RowTransaction
          label={t('debt_stack.debt_detail.total')}
          value={
            params?.type === 'debt' ? (
              <Text numberOfLines={1}>
                {params?.item.value.toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                })}
              </Text>
            ) : (
              <Text numberOfLines={1}>
                -
                {params?.item.amount.toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                })}
              </Text>
            )
          }
        />
      </ScrollContainer>
      <View
        style={{
          justifyContent: 'center',
          marginHorizontal: marginHorizontal,
          marginBottom: 40,
        }}
      >
        <Button
          text={t('debt_stack.debt_detail.edit')}
          color={mainColor}
          style={{
            backgroundColor: babyBlue,
            marginTop: 10,
          }}
          onPress={handleOnPress}
        />
      </View>
    </ScreenContainer>
  );
};

export default DebtDetail;
