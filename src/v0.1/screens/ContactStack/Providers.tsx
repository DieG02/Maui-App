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

interface Props {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const { mainColor, marginHorizontal, white, textBlack } = customStyles;

const Providers = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const { setContacts } = useContext(GeneralContext);
  const [text, onChangeText] = useState('');
  const [isSearch, setIsSearch] = useState(false);

  const {
    data: providers,
    isLoading,
    refetch: getProviders,
  } = useGetAllContacts('provider', {
    onSuccess: data => {
      setContacts(data);
    },
  });

  const filterData = useMemo(() => {
    return providers?.filter((item: any) => item.name?.toLowerCase().startsWith(text.toLowerCase()));
  }, [providers, text]);

  const handleOnPress = (item: IContact) => {
    if (route.params?.screen === 'EditExpense') {
      navigation.navigate({
        name: 'EditExpense',
        params: { contact: item },
        merge: true,
      });
    } else if (route.params?.screen === 'NewExpense') {
      navigation.navigate({
        name: 'NewExpense',
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
          backgroundColor: white,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size='large' color={textBlack} />
      </View>
    );
  }

  return (
    <ScreenContainer>
      {!isSearch ? (
        <BackHeaderTitle
          label={t('contact_stack.provider.providers')}
          onPressBack={() => navigation.goBack()}
          withSearch
          onPressSearch={() => setIsSearch(true)}
        />
      ) : (
        <SearchBar
          onChangeText={onChangeText}
          text={text}
          placeholder={t('contact_stack.provider.search')}
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
          backgroundColor: white,
          marginHorizontal: marginHorizontal,
          marginTop: 10,
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        refreshing={false}
        ListEmptyComponent={() => <EmptyState title={t('contact_stack.provider.empty_providers')} percentage={0.25} />}
        onRefresh={() => {
          getProviders();
        }}
        onEndReached={() => {
          getProviders();
        }}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => <ContactCard data={item} type='provider' onPress={() => handleOnPress(item)} />}
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
          text={t('contact_stack.button_text')}
          onPress={() =>
            navigation.navigate('NewContact', {
              type: 'provider',
              screen: route.params?.screen,
            })
          }
          style={{
            backgroundColor: mainColor,
          }}
        />
      </View>
    </ScreenContainer>
  );
};

export default Providers;
