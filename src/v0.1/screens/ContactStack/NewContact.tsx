import { StatusBar, View, ActivityIndicator, FlatList, Platform } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { RouteProp, NavigationProp } from '@react-navigation/native';
import customStyles from '../../styles/customStyles';
import { checkPermissionAndroid, fetchContacts, requestContactPermission } from '../../requests';
import AddContact from '../../components/common/AddContact';
import ContactForm from '../../components/common/ContactForm';
import Button from '../../components/common/Button';
import ScreenContainer from '../../components/containers/ScreenContainer';
import { BackHeaderTitle } from '../../components/common/HeaderTitle';
import SearchBar from '../../components/common/SearchBar';
import EmptyState from '../../components/common/EmptyState';
import { useTranslation } from 'react-i18next';
import RNPermissions, { PERMISSIONS } from 'react-native-permissions';

interface Props {
  route: RouteProp<any, any>;
  navigation: NavigationProp<any, any>;
}
const statusBarStyle = 'dark-content';

const { background, mainColor, marginHorizontal } = customStyles;

interface Contact {
  name: string;
  phone: string;
  id: string;
}

const { ...PERMISSIONS_IOS } = PERMISSIONS.IOS; // remove siri (certificate required)

const NewContact = ({ route, navigation }: Props) => {
  const { t } = useTranslation();
  const { params } = route;

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState('');
  const [search, onChangeSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);

  const getContacts = async () => {
    setIsLoading(true);
    const contactos = await fetchContacts();
    setContacts(contactos);
    setIsLoading(false);
  };

  const getAllContactsFromPhone = async () => {
    const PLATFORM = Platform.OS === 'ios' ? 'ios' : 'android';
    if (PLATFORM === 'ios') {
      await RNPermissions.request(PERMISSIONS_IOS.CONTACTS);
      getContacts();
    } else {
      const hasPermission = await checkPermissionAndroid();
      if (hasPermission) {
        getContacts();
      } else {
        const allowed = await requestContactPermission();
        allowed && getContacts();
      }
    }
  };

  useEffect(() => {
    getAllContactsFromPhone();
  }, []);

  const contactsFiltered = useMemo(() => {
    const filtered = contacts?.filter(item => item.name?.toLowerCase().includes(search.toLowerCase()));
    return filtered;
  }, [contacts, search]);

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
        <ActivityIndicator size='large' color='#141414' />
      </View>
    );
  }

  return (
    <ScreenContainer>
      <StatusBar barStyle={statusBarStyle} backgroundColor='white' />
      {!isSearch ? (
        <BackHeaderTitle
          label={t('contact_stack.new_contact.add_contact')}
          onPressBack={() => navigation.goBack()}
          withSearch
          onPressSearch={() => setIsSearch(true)}
        />
      ) : (
        <SearchBar
          onChangeText={onChangeSearch}
          text={search}
          placeholder={t('contact_stack.new_contact.search')}
          onPress={() => {
            onChangeSearch('');
            setIsSearch(false);
          }}
          onBlur={() => search.length === 0 && setIsSearch(false)}
        />
      )}
      <FlatList
        overScrollMode='never'
        data={contactsFiltered}
        style={{
          flex: 1,
          backgroundColor: background,
          marginHorizontal: marginHorizontal,
          marginTop: 10,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <EmptyState title={t('contact_stack.new_contact.empty_clients')} percentage={0.25} />}
        keyExtractor={item => item.id}
        refreshing={false}
        onRefresh={() => {
          getAllContactsFromPhone();
        }}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <AddContact data={item} key={item.id} type={params?.type} screen={params?.screen} navigation={navigation} />
        )}
      />
      <ContactForm
        comments={comments}
        setComments={setComments}
        email={email}
        setEmail={setEmail}
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        type={params?.type}
        screen={params?.screen}
        navigation={navigation}
      />
      <View
        style={{
          justifyContent: 'center',
          marginHorizontal: marginHorizontal,
          marginVertical: 20,
        }}
      >
        <Button
          text={t('contact_stack.new_contact.create_contact')}
          onPress={() => setIsModalVisible(true)}
          style={{
            backgroundColor: mainColor,
          }}
        />
      </View>
    </ScreenContainer>
  );
};

export default NewContact;
