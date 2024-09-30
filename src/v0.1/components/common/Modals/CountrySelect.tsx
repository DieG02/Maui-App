import React, { useMemo, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import customStyles from '../../../styles/customStyles';
import OptionCountrySelect from '../OptionCountrySelect';

import { t } from 'i18next';
import Entypo from 'react-native-vector-icons/Entypo';
import useToggle from '../../../hooks/useToggle';
import { ICountry } from '../../../types/types';
import EmptyState from '../EmptyState';
import SearchBar from '../SearchBar';

const { mainColor, white, ligthBlue, blueSelected, textBlack, expense, secondaryColorBorder, textLight } = customStyles;
interface Props {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  name: string;
  notRequired?: boolean;
  options: ICountry[];
  withSearch?: boolean;
  placeholder?: string;
  withPlaceholder?: boolean;
}

const CountrySelect = ({
  selectedOption,
  setSelectedOption,
  name,
  notRequired,
  options,
  withSearch = true,
  placeholder,
  withPlaceholder = false,
}: Props) => {
  const { toggle, setToggle, value } = useToggle(false);

  const countryInfo = options.find((item: ICountry) => item.isoCode === selectedOption);

  const [text, onChangeText] = useState('');

  const handleModal = (option: string) => {
    setSelectedOption(option);
    toggle();
    onChangeText('');
  };

  const filterData = useMemo(() => {
    return options?.filter((item: ICountry) => item.name?.toLowerCase().startsWith(text.toLowerCase()));
  }, [options, text]);

  const handleClear = () => {
    onChangeText('');
    setToggle(false);
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          color: textBlack,
          fontFamily: 'Gilroy-Bold',
          marginBottom: 10,
        }}
      >
        {name} <Text style={{ color: expense }}>{!notRequired && '*'}</Text>
      </Text>

      <Modal
        scrollOffset={100}
        isVisible={value}
        useNativeDriverForBackdrop={true}
        onBackdropPress={() => handleClear()}
        onSwipeComplete={() => handleClear()}
        onBackButtonPress={() => handleClear()}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
      >
        <View
          style={{
            backgroundColor: white,
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            height: 500,
          }}
        >
          {withSearch && (
            <SearchBar
              autoFocus={false}
              onChangeText={onChangeText}
              text={text}
              placeholder={t('contact_stack.client.search')}
              onPress={() => {
                if (text === '') handleClear();
                onChangeText('');
              }}
              style={{
                borderRadius: 30,
              }}
            />
          )}

          <FlatList
            overScrollMode='never'
            data={filterData}
            keyboardShouldPersistTaps='handled'
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <EmptyState
                title={t('contact_stack.client.empty_clients')}
                style={{
                  alignSelf: 'center',
                  height: 200,
                  marginVertical: 100,
                  justifyContent: 'center',
                }}
              />
            )}
            keyExtractor={item => item.id}
            refreshing={false}
            onEndReachedThreshold={0.5}
            numColumns={3}
            columnWrapperStyle={{
              marginHorizontal: 20,
            }}
            renderItem={({ item }) => (
              <OptionCountrySelect
                galleryMode
                withPrefix={false}
                key={item.id}
                name={item.name}
                flag={item.isoCode}
                backgroundColor={selectedOption === item.isoCode ? ligthBlue : white}
                textColor={selectedOption === item.isoCode ? mainColor : blueSelected}
                onPress={() => handleModal(item.isoCode)}
                borderWith={selectedOption === item.isoCode ? 0 : 1}
              />
            )}
          />
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => setToggle(true)}
        style={{
          borderRadius: 12,
          borderColor: secondaryColorBorder,
          borderWidth: 1,
          paddingHorizontal: 0,
          height: 55,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {withPlaceholder ? (
          countryInfo?.name ? (
            <Text
              style={{
                color: textBlack,
                paddingHorizontal: 30,
                fontFamily: 'Gilroy-SemiBold',
              }}
            >
              {countryInfo?.name}
            </Text>
          ) : (
            <Text
              style={{
                marginHorizontal: 20,
                color: textLight,
                fontSize: 16,
                fontFamily: 'Gilroy-Medium',
              }}
            >
              {placeholder}
            </Text>
          )
        ) : (
          <Text
            style={{
              color: textBlack,
              paddingHorizontal: 30,
              fontFamily: 'Gilroy-SemiBold',
            }}
          >
            {countryInfo?.name}
          </Text>
        )}

        <Entypo name='chevron-down' size={25} style={{ marginRight: 20 }} color={mainColor} />
      </TouchableOpacity>
    </View>
  );
};

export default CountrySelect;
