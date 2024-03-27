import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import customStyles from '../../../styles/customStyles';
import { getAllTransactionsResponseDto } from '../../../../../../Maui-Backend/src/controllers/types';
import styles from './style';
import { parseDDMMYY } from '../../../utils/helper';
import { useTranslation } from 'react-i18next';
import { capitalLetter } from '../../../utils/capitalLetter';
import { parserToCurrency } from '../../../utils/adapter';

const { textBlack, positive } = customStyles;
const KEY_PATH = 'balance_stack.payment_method_options';
interface Props {
  onPress: () => void;
  data: getAllTransactionsResponseDto[0];
}

const TransactionCard = ({ onPress, data }: Props) => {
  const { t } = useTranslation();

  const locale = data.financialAccount?.currency.locale;
  const code = data.financialAccount?.currency.code;

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
          <Text style={styles().textSubtitle}>{parseDDMMYY(data.date)}</Text>
        </View>
      </View>
      <View style={styles().rightContainer}>
        <View style={styles().textContainer}>
          {data.category?.type === 'CREDIT' ? (
            <Text style={styles('', positive).textTitle} numberOfLines={1}>
              +{parserToCurrency(data.total_amount, locale, code)}
            </Text>
          ) : (
            <Text style={styles('', textBlack).textTitle} numberOfLines={1}>
              {parserToCurrency(data.total_amount, locale, code)}
            </Text>
          )}
          <Text style={styles().textSubtitle}>
            {data.payment_method && capitalLetter(t(`${KEY_PATH}.${data.payment_method.toLowerCase()}`))}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionCard;
