import React from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import ScreenContainer from '../../components/containers/ScreenContainer';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import customStyles from '../../styles/customStyles';
import EditDebtForm from '../../components/common/EditDebtForm';
import { useTranslation } from 'react-i18next';

const { mainColor } = customStyles;

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const EditDebt = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const { params } = route;

  return (
    <ScreenContainer>
      <BackHeaderTitle
        label={t('debt_stack.edit_debt.title')}
        onPressBack={() => navigation.goBack()}
        hasType
        color={mainColor}
      />
      <EditDebtForm navigation={navigation} data={params} />
    </ScreenContainer>
  );
};
export default EditDebt;
