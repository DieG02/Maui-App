import React from 'react';
import { Text, View } from 'react-native';
import useToggle from '../../../hooks/useToggle';
import customStyles from '../../../styles/customStyles';
import HiderComponent from '../../common/HiderComponent';
import styles from './style';
import { useTranslation } from 'react-i18next';

const { textBlack } = customStyles;

// TODO: Refactor this interface to use the correct types
interface Props {
  data: number | undefined;
}

const GeneralBalance = ({ data }: Props) => {
  const { t } = useTranslation();
  const { value, toggle } = useToggle();
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.text}>{t('home_stack.budget.title')}</Text>
        <HiderComponent size={30} color={textBlack} value={value} toggle={toggle} />
      </View>
      <View style={styles.container}>
        {value ? (
          <Text style={styles.textPrice}>$****</Text>
        ) : (
          <Text style={styles.textPrice}>
            {data?.toLocaleString('es-AR', {
              style: 'currency',
              currency: 'ARS',
            })}
          </Text>
        )}
      </View>
    </View>
  );
};

export default GeneralBalance;
