import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import customStyles from '../../styles/customStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import 'moment/locale/es';
import { useTranslation } from 'react-i18next';

const { textBlack, background, secondaryColor, expense, income, marginHorizontal, iconBlue } = customStyles;

interface Props {
  type: string;
  onPress: () => void;
  date: string;
  sales?: number;
  purchases?: number;
  totalPrice: string;
  name: string;
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: marginHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    backgroundColor: background,
  },
  iconType: {
    width: 50,
    height: 50,
    backgroundColor: secondaryColor,
    borderRadius: 25,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionType: {
    color: textBlack,
    fontSize: 14,
    fontFamily: 'Gilroy-Regular',
  },
  label: {
    fontSize: 16,
    fontFamily: 'Gilroy-SemiBold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const DebtContactCard = ({ date, type, onPress, sales, purchases, totalPrice, name }: Props) => {
  const { t, i18n } = useTranslation();
  moment.locale(i18n.language);

  const renderTypeContact = () => {
    switch (type) {
      case 'client': {
        return (
          <View style={styles.iconType}>
            <Feather name='user' size={25} color={iconBlue} />
          </View>
        );
      }
      case 'provider': {
        return (
          <View style={styles.iconType}>
            <Feather name='truck' size={25} color={iconBlue} />
          </View>
        );
      }
    }
  };

  const renderTypeDescription = () => {
    switch (type) {
      case 'client': {
        return (
          <Text style={styles.descriptionType}>
            {t('debt_stack.income_debt.sales')}
            {sales && sales}
          </Text>
        );
      }
      case 'provider': {
        return (
          <Text style={styles.descriptionType}>
            {t('debt_stack.expense_debt.purchases')}
            {purchases && purchases}
          </Text>
        );
      }
    }
  };

  const renderTypePrice = () => {
    switch (type) {
      case 'client': {
        return <Text style={[styles.label, { color: income }]}>{totalPrice}</Text>;
      }
      case 'provider': {
        return <Text style={[styles.label, { color: expense }]}>{totalPrice}</Text>;
      }
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.row}>
        {renderTypeContact()}
        <View style={{ alignSelf: 'center' }}>
          <Text style={[styles.label, { color: textBlack }]}>{name}</Text>
          {renderTypeDescription()}
        </View>
      </View>
      <View style={styles.row}>
        <View style={{ alignItems: 'flex-end' }}>
          {renderTypePrice()}
          <Text style={styles.descriptionType}>{date}</Text>
        </View>
        <Entypo name='chevron-small-right' color={textBlack} size={30} />
      </View>
    </TouchableOpacity>
  );
};

export default DebtContactCard;
