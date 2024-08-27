import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';
import customStyles from '../../../styles/customStyles';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

const { textLight } = customStyles;

// TODO: Refactor this interface to use the correct types
interface Props {
  left?: number;
  right?: number;
}

const NewAccountCard = ({ left, right }: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const handleRedirect = () => {
    navigation.navigate('NewFinancialAccount');
  };
  return (
    <TouchableOpacity style={styles({ left, right }).wrapper} activeOpacity={0.5} onPress={handleRedirect}>
      <View style={styles({}).container}>
        <View style={styles({}).icon}>
          <Feather name='plus' size={35} color={textLight} />
        </View>
        <View style={styles({}).subWrapper}>
          <Text style={styles({}).textValue} numberOfLines={1}>
            {t('home_stack.accounts.add_new_account')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NewAccountCard;
