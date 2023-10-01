import { View } from 'react-native';
import React, { useState } from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import ScreenContainer from '../../components/containers/ScreenContainer';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import Spacer from '../../components/common/Spacer';
import SimpleInput from '../../components/common/SimpleInput';
import Button from '../../components/common/Button';
import customStyles from '../../styles/customStyles';
import { useMutation } from 'react-query';
import { updateContactById } from '../../services/contacts';
import ScrollContainer from '../../components/containers/ScrollContainer';
import { queryClient } from '../../utils/queryClient';
import { showToast } from '../../utils/toast';
import { alertDelete } from '../../utils/alerts';
import { useTranslation } from 'react-i18next';
import useDeleteContact from '../../services/Contact/useDeleteContact';

interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
}

const { mainColor, background, width } = customStyles;

const ContactDetail = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const { params } = route;

  const initial = {
    name: params?.contact.name,
    email: params?.contact.email,
    phone: params?.contact.phone,
    note: params?.contact.note,
  };

  const [data, setData] = useState(initial);

  const isChanged = JSON.stringify(initial) !== JSON.stringify(data);

  const { mutateAsync: updateContact } = useMutation(() => updateContactById(params?.contact.id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries('Contacts');
      navigation.goBack();
      showToast(t('contact_stack.contact_detail.edit_contact'));
    },
  });

  const { mutateAsync: deleteContact } = useDeleteContact(params?.contact.id, {
    onSuccess: () => {
      queryClient.invalidateQueries('Transactions');
      queryClient.invalidateQueries('Contacts');
      navigation.goBack();
      showToast(t('contact_stack.contact_detail.delete_contact'));
    },
  });

  const handleDelete = () => {
    alertDelete(t('contact_stack.contact_detail.delete_alert'), deleteContact);
  };

  const handleTitle = () => {
    if (params && params.contact.type === 'CLIENT') {
      return t('contact_stack.contact_detail.client');
    } else {
      return t('contact_stack.contact_detail.provider');
    }
  };

  return (
    <ScreenContainer>
      <BackHeaderTitle
        label={handleTitle()}
        onPressBack={() => navigation.goBack()}
        withDelete
        onPressDelete={handleDelete}
      />
      <ScrollContainer
        style={{
          paddingHorizontal: 30,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Spacer height={20} />
        <SimpleInput
          setValue={value => setData({ ...data, name: value })}
          value={data.name}
          name={t('contact_stack.contact_detail.name')}
          marginBottom={20}
          placeholder={t('contact_stack.contact_detail.name')}
        />
        <SimpleInput
          setValue={value => setData({ ...data, phone: value })}
          value={data.phone}
          name={t('contact_stack.contact_detail.phone')}
          marginBottom={20}
          placeholder={t('contact_stack.contact_detail.phone')}
          keyboardType='phone-pad'
        />
        <SimpleInput
          setValue={value => setData({ ...data, email: value })}
          value={data.email}
          name={t('contact_stack.contact_detail.e_mail')}
          marginBottom={20}
          placeholder={t('contact_stack.contact_detail.e_mail')}
          autoCapitalize='none'
          keyboardType='email-address'
        />
        <SimpleInput
          setValue={value => setData({ ...data, note: value })}
          value={data.note}
          name={t('contact_stack.contact_detail.comments')}
          marginBottom={20}
          placeholder={t('contact_stack.contact_detail.add_comments')}
        />
      </ScrollContainer>
      <View
        style={{
          width: '100%',
          height: 90,
          alignItems: 'center',
          backgroundColor: background,
        }}
      >
        <Button
          disabled={!isChanged}
          onPress={() => updateContact()}
          text={t('contact_stack.contact_detail.update_contact')}
          style={{
            backgroundColor: isChanged ? mainColor : '#B3B3B3',
            borderRadius: 25,
            elevation: 0,
            width: width - 40,
            marginTop: 6,
          }}
        />
      </View>
    </ScreenContainer>
  );
};

export default ContactDetail;
