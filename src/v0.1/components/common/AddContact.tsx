import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import useMatchContact from '../../hooks/useMatchContact';
import { useTranslation } from 'react-i18next';
import customStyles from '../../styles/customStyles';
import { queryClient } from '../../utils/queryClient';
import { IContact, IContactInput, IContactType } from '../../types/types';
import useCreateContact from '../../services/Contacts/useCreateContact';
import { GET_CONTACTS_KEY } from '../../services/Contacts/useGetAllContacts';

interface Props {
  data: IContact;
  screen: string;
  type: IContactType;
  navigation: NavigationProp<any, any>;
}

const { textBlack, mainColor } = customStyles;

const AddContact = ({ data, type, screen, navigation }: Props) => {
  const { isAdded } = useMatchContact(data.phone);
  const { t } = useTranslation();

  const handleOnPress = (data: IContact) => {
    if (screen === 'NewIncome') {
      navigation.navigate('NewIncome', { contact: data });
    }
    if (screen === 'NewExpense') {
      navigation.navigate('NewExpense', { contact: data });
    }
  };

  const form: IContactInput = {
    name: data.name,
    phone: data.phone,
    note: '',
    email: '',
    type: type.toUpperCase() as IContactType,
  };

  const { mutateAsync: createContact, isLoading } = useCreateContact({
    onSuccess: data => {
      queryClient.invalidateQueries(GET_CONTACTS_KEY);
      handleOnPress(data);
    },
  });

  return (
    <TouchableOpacity
      onPress={() =>
        !isAdded &&
        createContact({
          data: form,
        })
      }
      disabled={isAdded}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}
    >
      <View style={{ flexDirection: 'column' }}>
        <Text
          style={{
            color: textBlack,
            fontSize: 16,
            fontFamily: 'Gilroy-SemiBold',
          }}
        >
          {data.name}
        </Text>
        <Text
          style={{
            color: textBlack,
            fontSize: 14,
            fontFamily: 'Gilroy-Regular',
          }}
        >
          {data.phone}
        </Text>
      </View>
      <View>
        {isLoading ? (
          <View style={{ width: 70 }}>
            <ActivityIndicator size='small' color={textBlack} />
          </View>
        ) : (
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              width: 80,
            }}
          >
            {isAdded ? (
              <Text
                style={{
                  color: mainColor,
                  fontSize: 16,
                  fontFamily: 'Gilroy-Bold',
                }}
              >
                {t('contact_stack.new_contact.created')}
              </Text>
            ) : (
              <Text
                style={{
                  color: textBlack,
                  fontSize: 16,
                  fontFamily: 'Gilroy-SemiBold',
                }}
              >
                {t('contact_stack.new_contact.new')}
              </Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AddContact;
