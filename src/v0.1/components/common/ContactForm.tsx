import { View, ScrollView } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import CommonInput from './CommonInput';
import Button from './Button';
import customStyles from '../../styles/customStyles';
import { createContactBodyInputDto } from '../../../../Maui-Backend/src/controllers/types';
import { useMutation } from 'react-query';
import { createNewContact } from '../../services/contacts';
import { NavigationProp } from '@react-navigation/native';
import { queryClient } from '../../utils/queryClient';
import { useTranslation } from 'react-i18next';

const { mainColor } = customStyles;

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  name: string;
  setName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  comments: string;
  setComments: (value: string) => void;
  screen: string;
  type: createContactBodyInputDto['typeOfContact'];
  navigation: NavigationProp<any, any>;
}

const ContactForm = ({
  isModalVisible,
  setIsModalVisible,
  phone,
  setPhone,
  comments,
  setComments,
  email,
  setEmail,
  name,
  setName,
  type,
  screen,
  navigation,
}: Props) => {
  const { t } = useTranslation();
  const action = (queryName: string, screenName: string, data) => {
    queryClient.invalidateQueries(queryName);
    navigation.navigate(screenName, { contact: data });
  };

  const handleOnPress = (data: IContact) => {
    if (screen === 'NewIncome') {
      action('clients', 'NewIncome', data);
    } else if (screen === 'EditIncome') {
      action('clients', 'EditIncome', data);
    } else if (screen === 'NewExpense') {
      action('providers', 'NewExpense', data);
    } else if (screen === 'EditExpense') {
      action('providers', 'EditExpense', data);
    } else {
      type.toUpperCase() === 'CLIENT' ? action('clients', 'Clients', data) : action('providers', 'Providers', data);
    }
  };

  const form: createContactBodyInputDto = {
    name: name,
    phone: phone,
    comments: comments,
    email: email,
    typeOfContact: type.toUpperCase() as createContactBodyInputDto['typeOfContact'],
  };

  const { mutateAsync } = useMutation(
    (form: createContactBodyInputDto) => {
      return createNewContact(form);
    },
    {
      onSuccess: data => {
        handleOnPress(data);
      },
    }
  );

  return (
    <Modal
      isVisible={isModalVisible}
      useNativeDriverForBackdrop={true}
      onBackdropPress={() => setIsModalVisible(false)}
      onSwipeComplete={() => setIsModalVisible(false)}
      onBackButtonPress={() => setIsModalVisible(false)}
    >
      <View
        style={{
          backgroundColor: 'white',
          marginHorizontal: 10,
          borderRadius: 15,
        }}
      >
        <ScrollView
          overScrollMode='never'
          showsVerticalScrollIndicator={false}
          style={{
            marginHorizontal: 30,
            marginVertical: 20,
          }}
        >
          <CommonInput
            name={t('contact_stack.new_contact.contact_form.name')}
            placeholder={t('contact_stack.new_contact.contact_form.name_placeholder')}
            marginBottom={20}
            value={name}
            setValue={setName}
          />
          <CommonInput
            name={t('contact_stack.new_contact.contact_form.phone')}
            placeholder={t('contact_stack.new_contact.contact_form.phone_placeholder')}
            marginBottom={20}
            value={phone}
            setValue={setPhone}
            keyboardType='phone-pad'
          />
          <CommonInput
            name={t('contact_stack.new_contact.contact_form.e_mail')}
            placeholder={t('contact_stack.new_contact.contact_form.e_mail_placeholder')}
            marginBottom={20}
            value={email}
            setValue={setEmail}
            keyboardType='email-address'
          />
          <CommonInput
            name={t('contact_stack.new_contact.contact_form.comment')}
            placeholder={t('contact_stack.new_contact.contact_form.comment_placeholder')}
            marginBottom={20}
            value={comments}
            setValue={setComments}
            multiline={true}
          />
          <Button
            text={t('contact_stack.new_contact.contact_form.create_contact')}
            onPress={() => mutateAsync(form)}
            style={{ backgroundColor: mainColor, height: 50 }}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ContactForm;
