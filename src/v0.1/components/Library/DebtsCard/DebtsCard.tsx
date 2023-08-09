import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import customStyles from '../../../styles/customStyles';
import styles from './style';
import { parseDDMMYY } from '../../../utils/helper';
import { useTranslation } from 'react-i18next';
import { capitalLetter } from '../../../utils/capitalLetter';

const { textBlack, positive } = customStyles;
const KEY_PATH = 'balance_stack.payment_method_options';
interface Props {
  type: 'debt' | 'payment';
  data: any;
  onPress: () => void;
}

const DebtsCard = ({ onPress, data, type }: Props) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity onPress={onPress} style={styles().wrapper}>
      <View style={styles().leftContainer}>
        <View style={styles().iconContainer}>
          {!data.imageUrl ? (
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/1255/1255986.png?w=1380&t=st=1654300895~exp=1654301495~hmac=45b46434561dc28bf1924a2c7388c4835ac5f91b59a7ce3f624f943d80d7e98c',
              }}
              style={{ width: 25, height: 25 }}
            />
          ) : (
            <Image
              source={{
                uri: data.imageUrl,
              }}
              style={{ width: 25, height: 25 }}
            />
          )}
        </View>
        <View style={styles('left').textContainer}>
          <Text style={styles('', textBlack).titleCard} numberOfLines={1}>
            {type === 'debt' ? data.name : `${t('debt_stack.debt_detail.deposite_date')} ${parseDDMMYY(data.paidAt)}`}
          </Text>
          <Text style={styles().textSubtitle}>{parseDDMMYY(data.paidAt)}</Text>
        </View>
      </View>
      <View style={styles().rightContainer}>
        <View style={styles().textContainer}>
          {type === 'debt' ? (
            <Text style={styles('', positive).textTitle} numberOfLines={1}>
              {data.value.toLocaleString('es-AR', {
                style: 'currency',
                currency: 'ARS',
              })}
            </Text>
          ) : (
            <Text style={styles('', textBlack).textTitle} numberOfLines={1}>
              -
              {data.amount.toLocaleString('es-AR', {
                style: 'currency',
                currency: 'ARS',
              })}
            </Text>
          )}
          <Text style={styles().textSubtitle}>
            {data.paymentMethod
              ? capitalLetter(t(`${KEY_PATH}.${data.paymentMethod.toLowerCase()}`))
              : t('balance_stack.state_options.debt')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DebtsCard;
