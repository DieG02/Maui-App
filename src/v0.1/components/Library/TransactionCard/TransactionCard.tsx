import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import customStyles from '../../../styles/customStyles';
import { ITransactionDetail } from '../../../types/types';
import { parserToCurrency } from '../../../utils/adapter';
import { capitalLetter } from '../../../utils/capitalLetter';
import { parseDDMMYY } from '../../../utils/helper';
import styles from './style';

const { textBlack, positive } = customStyles;
const KEY_PATH = 'balance_stack.payment_method_options';
interface Props {
  onPress: () => void;
  data: ITransactionDetail;
}

const TransactionCard = ({ onPress, data }: Props) => {
  const { t } = useTranslation();

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
              +{parserToCurrency(data.total_amount, '', code)}
            </Text>
          ) : (
            <Text style={styles('', textBlack).textTitle} numberOfLines={1}>
              {parserToCurrency(data.total_amount, '', code)}
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
