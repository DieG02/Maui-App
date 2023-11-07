import { StatusBar, Text, View } from 'react-native';
import ScreenContainer from '../../components/containers/ScreenContainer';
import React, { useState, useContext } from 'react';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import customStyles from '../../styles/customStyles';
import Spacer from '../../components/common/Spacer';
import CommonInput from '../../components/common/CommonInput';
import Button from '../../components/common/Button';
import { editUserAccount } from '../../services/userAccount';
import { unsubscribe } from '../../services/auth';
import ImageProfile from '../../components/common/ImageProfile';
import { useMutation } from 'react-query';
import { editUserAccountBodyInputDto } from '../../../../../Maui-Backend/src/controllers/types';
import LoadingComponent from '../../components/Library/LoadingComponent';
import Form from '../../components/Library/Form';
import useForm from '../../hooks/useForm';
import PhoneInput from '../../components/common/PhoneInput';
import { showToast } from '../../utils/toast';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VERIFY_TOKEN } from '../../services/Account/useVerifyToken';
import { queryClient } from '../../utils/queryClient';
import AlertModal from '../../components/common/Modals/AlertModal';


const statusBarStyle = 'dark-content';
const { mainColor, textBlack, background2, expense, expenseLight } = customStyles;

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const UserData = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const { params } = route;
  const [modal, setModal] = useState(false);
  const { values, setValues } = useForm<editUserAccountBodyInputDto>(params?.data);
  const email = params?.email;
  const isChanged = JSON.stringify(values) !== JSON.stringify(params?.data);
  const { setIsLoggedIn } = useContext(AuthContext);


  const data: editUserAccountBodyInputDto = {
    cellPhone: values.cellPhone,
    name: values.name,
    address: values.address,
    countryCode: values.countryCode,
  };

  const { mutateAsync: editAccount, isLoading } = useMutation(() => editUserAccount(data), {
    onSuccess: () => {
      navigation.goBack();
      showToast(t('more_screen.user_data.toast_edit_message'));
    },
  });
  const { mutateAsync: deleteAccount, isLoading: isDeleting } = useMutation(() => unsubscribe(), {
    onSuccess: async () => {
      setIsLoggedIn(false);
      await AsyncStorage.removeItem('userInfo');
      queryClient.invalidateQueries(VERIFY_TOKEN);
      queryClient.clear();
    },
  });

  const [isDeleteModalVisible, setDeleteModalVisible] = useState<boolean>();
  const handleOnModalShow = (): void => setDeleteModalVisible(true);
  const handleOnModalHide = (): void => setDeleteModalVisible(false);

  if (isLoading || isDeleting) {
    return <LoadingComponent color={mainColor} />;
  }

  return (
    <ScreenContainer>
      <StatusBar barStyle={statusBarStyle} backgroundColor='white' />
      <BackHeaderTitle label={t('more_screen.user_data.title')} onPressBack={() => navigation.goBack()} />
      <Form>
        <Spacer height={10} />
        <ImageProfile url={values.image} name={values.name} />
        {/* v0.2 */}
        {/* <PencilImageInput
          values={values}
          setValues={setValues}
        /> */}
        <Spacer height={10} />
        <CommonInput
          value={values.name}
          setValue={name => setValues({ ...values, name })}
          name={t('more_screen.user_data.name')}
          marginBottom={20}
          autoCapitalize='words'
        />
        <Spacer height={5} />
        <CommonInput
          value={values.address}
          setValue={address => setValues({ ...values, address })}
          name={t('more_screen.user_data.address')}
          placeholder={t('more_screen.user_data.address_placeholder')}
          marginBottom={20}
          autoCapitalize='words'
        />
        <Spacer height={5} />
        <PhoneInput
          value={values.cellPhone}
          setValue={cellPhone =>
            setValues((prev: editUserAccountBodyInputDto) => ({
              ...prev,
              cellPhone,
            }))
          }
          isModalVisible={modal}
          setIsModalVisible={setModal}
          selectedOption={values.countryCode}
          setSelectedOption={countryCode =>
            setValues((prev: editUserAccountBodyInputDto) => ({ ...prev, countryCode }))
          }
          name={t('more_screen.user_data.phone')}
          placeholder={t('more_screen.user_data.phone_number')}
          marginBottom={20}
          notRequired
        />
        <Spacer height={5} />
        <Text
          style={{
            fontSize: 18,
            color: textBlack,
            fontFamily: 'Gilroy-Bold',
            marginBottom: 10,
          }}
        >
          {t('more_screen.user_data.mail')}
        </Text>
        <View
          style={{
            backgroundColor: background2,
            height: 55,
            borderRadius: 12,
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: textBlack,
              fontFamily: 'Gilroy-Regular',
              marginLeft: 20,
              fontSize: 18,
            }}
          >
            {email}
          </Text>
        </View>
        <Spacer height={15} />
        <Button
          text={t('more_screen.user_data.save')}
          onPress={editAccount}
          disabled={!isChanged}
          color={isChanged ? 'white' : mainColor}
          style={{
            backgroundColor: isChanged ? mainColor : background2,
            marginTop: 10,
          }}
        />
          {isDeleteModalVisible && 
            <AlertModal
              title='Está acción es irreversible'
              description={`Si eliminas tu cuenta deberás empezar de cero, incluso creando un nuevo usuario.\n\¿Estás seguro que desas continuar?`}
              isVisible={true}
              confirm={deleteAccount}
              confirmLabel='Si, eliminar cuenta'
              cancel={handleOnModalHide}
              cancelLabel='Cancelar'
            />}
        <Button
          text={t('more_screen.user_data.delete')}
          // onPress={deleteAccount}
          onPress={handleOnModalShow}
          color={expense}
          style={{
            backgroundColor: expenseLight,
            marginBottom: 30,
            marginTop: 10,
          }}
        />
      </Form>
    </ScreenContainer>
  );
};

export default UserData;
