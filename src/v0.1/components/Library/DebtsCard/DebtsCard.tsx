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
          <Image
            source={{
              uri: data.category?.image,
            }}
            style={{ width: 25, height: 25 }}
          />
        </View>
        <View style={styles('left').textContainer}>
          <Text style={styles('', textBlack).titleCard} numberOfLines={1}>
            {type === 'debt'
              ? data.description
              : `${t('debt_stack.debt_detail.deposit_date')} ${parseDDMMYY(data.createdAt)}`}
          </Text>
          <Text style={styles().textSubtitle}>{parseDDMMYY(data.createdAt)}</Text>
        </View>
      </View>
      <View style={styles().rightContainer}>
        <View style={styles().textContainer}>
          {type === 'debt' ? (
            <Text style={styles('', positive).textTitle} numberOfLines={1}>
              {data.total_amount.toLocaleString('es-AR', {
                style: 'currency',
                currency: 'ARS',
              })}
            </Text>
          ) : (
            <Text style={styles('', textBlack).textTitle} numberOfLines={1}>
              -
              {data.total_amount.toLocaleString('es-AR', {
                style: 'currency',
                currency: 'ARS',
              })}
            </Text>
          )}
          {type === 'payment' && (
            <Text style={styles().textSubtitle}>
              {capitalLetter(t(`${KEY_PATH}.${data.payment_method.toLowerCase()}`))}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DebtsCard;
