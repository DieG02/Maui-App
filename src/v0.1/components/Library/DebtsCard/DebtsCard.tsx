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
  actualAmount?: number;
}

const DebtsCard = ({ onPress, data, type, actualAmount }: Props) => {
  const { t } = useTranslation();

  const existPayments = data.total_amount === actualAmount;

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
            {data.description}
          </Text>
          <Text style={styles().textSubtitle}>{parseDDMMYY(data.createdAt)}</Text>
        </View>
      </View>
      <View style={styles().rightContainer}>
        <View style={styles().textContainer}>
          {type === 'debt' ? (
            data.type === 'CREDIT' ? (
              <Text style={styles('', positive).textTitle} numberOfLines={1}>
                {actualAmount?.toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                })}
              </Text>
            ) : (
              <Text style={styles('', textBlack).textTitle} numberOfLines={1}>
                -
                {actualAmount?.toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                })}
              </Text>
            )
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

          {type === 'debt' && !existPayments && (
            <Text
              style={[
                styles().textSubtitle,
                {
                  textDecorationLine: 'line-through',
                  color: textBlack,
                },
              ]}
              numberOfLines={1}
            >
              {data.total_amount?.toLocaleString('es-AR', {
                style: 'currency',
                currency: 'ARS',
              })}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DebtsCard;
