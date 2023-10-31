import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
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
import { alertDelete, commonAlert } from '../../utils/alerts';
import { useTranslation } from 'react-i18next';
import useDeleteContact from '../../services/Contact/useDeleteContact';
import LoadingComponent from '../../components/Library/LoadingComponent';
import useGetContactById from '../../services/Contact/useGetContactById';

interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
}

const { mainColor, background, width } = customStyles;

const ContactDetail = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const { params } = route;
  const [contact, setContact] = useState<any>(null);

  const { data, isLoading: isFetchingGetContactById } = useGetContactById(params?.contactId, {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setContact(data);
    }
  }, [data]);

  const isChanged = JSON.stringify(contact) !== JSON.stringify(data);

  const { mutateAsync: updateContact } = useMutation(() => updateContactById(params?.contactId, contact), {
    onSuccess: () => {
      queryClient.invalidateQueries(['Contact', params?.contactId]);
      queryClient.invalidateQueries('Contacts');
      navigation.goBack();
      showToast(t('contact_stack.contact_detail.edit_contact'));
    },
  });

  const { mutateAsync: deleteContact } = useDeleteContact(params?.contactId, {
    onSuccess: () => {
      queryClient.invalidateQueries('Contacts');
      queryClient.invalidateQueries('Transactions');
      navigation.goBack();
      showToast(t('contact_stack.contact_detail.delete_contact'));
    },
    onError: () => {
      commonAlert(t('contact_stack.contact_detail.error_delete_message'));
    },
  });

  const handleDelete = () => {
    alertDelete(t('contact_stack.contact_detail.delete_alert'), deleteContact);
  };

  const handleTitle = () => {
    if (data && data?.type === 'CLIENT') {
      return t('contact_stack.contact_detail.client');
    } else {
      return t('contact_stack.contact_detail.provider');
    }
  };

  if (isFetchingGetContactById) return <LoadingComponent color={mainColor} />;

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
          setValue={value => setContact({ ...contact, name: value })}
          value={contact?.name}
          name={t('contact_stack.contact_detail.name')}
          marginBottom={20}
          placeholder={t('contact_stack.contact_detail.name')}
        />
        <SimpleInput
          setValue={value => setContact({ ...contact, phone: value })}
          value={contact?.phone}
          name={t('contact_stack.contact_detail.phone')}
          marginBottom={20}
          placeholder={t('contact_stack.contact_detail.phone')}
          keyboardType='phone-pad'
        />
        <SimpleInput
          setValue={value => setContact({ ...contact, email: value })}
          value={contact?.email}
          name={t('contact_stack.contact_detail.e_mail')}
          marginBottom={20}
          placeholder={t('contact_stack.contact_detail.e_mail')}
          autoCapitalize='none'
          keyboardType='email-address'
        />
        <SimpleInput
          setValue={value => setContact({ ...contact, note: value })}
          value={contact?.note}
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
