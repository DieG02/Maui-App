import { View, FlatList, ActivityIndicator } from 'react-native';
import React, { useContext, useMemo, useState } from 'react';
import ContactCard from '../../components/common/ContactCard';
import customStyles from '../../styles/customStyles';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { GeneralContext } from '../../context/GeneralContext';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';
import ScreenContainer from '../../components/containers/ScreenContainer';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import SearchBar from '../../components/common/SearchBar';
import { useTranslation } from 'react-i18next';
import useGetAllContacts from '../../services/Contacts/useGetAllContacts';
import { IContact, IContactType } from '../../types/types';

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}
const { mainColor, background, marginHorizontal } = customStyles;

const Consumers = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const screen = route.params?.screen;
  const { setContacts } = useContext(GeneralContext);
  const [text, onChangeText] = useState('');
  const [isSearch, setIsSearch] = useState(false);

  const {
    data: clients,
    isLoading,
    refetch: getClients,
  } = useGetAllContacts(IContactType.CLIENT, {
    onSuccess: data => {
      setContacts(data);
    },
  });

  const filterData = useMemo(() => {
    return clients?.filter((item: IContact) => item.name?.toLowerCase().startsWith(text.toLowerCase()));
  }, [clients, text]);

  const handleOnPress = (item: IContact) => {
    if (screen === 'EditIncome') {
      navigation.navigate({
        name: 'EditIncome',
        params: { contact: item },
        merge: true,
      });
    } else if (screen === 'NewIncome') {
      navigation.navigate({
        name: 'NewIncome',
        params: { contact: item },
        merge: true,
      });
    } else {
      navigation.navigate('ContactDetail', { contactId: item.id });
    }
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size='large' color={mainColor} />
      </View>
    );
  }

  return (
    <ScreenContainer>
      {!isSearch ? (
        <BackHeaderTitle
          label={t('contact_stack.client.clients')}
          onPressBack={() => navigation.goBack()}
          withSearch
          onPressSearch={() => setIsSearch(true)}
        />
      ) : (
        <SearchBar
          onChangeText={onChangeText}
          text={text}
          placeholder={t('contact_stack.client.search')}
          onPress={() => {
            onChangeText('');
            setIsSearch(false);
          }}
          onBlur={() => text.length === 0 && setIsSearch(false)}
        />
      )}
      <FlatList
        overScrollMode='never'
        data={filterData}
        style={{
          flex: 1,
          backgroundColor: background,
          marginHorizontal: marginHorizontal,
          marginTop: 10,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <EmptyState title={t('contact_stack.client.empty_clients')} percentage={0.25} />}
        keyExtractor={item => item.id}
        refreshing={false}
        onRefresh={() => {
          getClients();
        }}
        onEndReached={() => {
          getClients();
        }}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => <ContactCard data={item} type='client' onPress={() => handleOnPress(item)} />}
      />
      <View
        style={{
          justifyContent: 'center',
          marginHorizontal: marginHorizontal,
          marginTop: 20,
          marginBottom: 40,
        }}
      >
        <Button
          onPress={() =>
            navigation.navigate('NewContact', {
              type: 'client',
              screen: route.params?.screen,
            })
          }
          text={t('contact_stack.button_text')}
          style={{
            backgroundColor: mainColor,
          }}
        />
      </View>
    </ScreenContainer>
  );
};

export default Consumers;
