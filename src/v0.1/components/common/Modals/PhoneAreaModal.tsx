import React, { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import Modal from 'react-native-modal';
import customStyles from '../../../styles/customStyles';
import OptionCountrySelect from '../OptionCountrySelect';
import PrefixInput from '../PrefixInput';
import useToggle from '../../../hooks/useToggle';
import EmptyState from '../EmptyState';
import SearchBar from '../SearchBar';
import { t } from 'i18next';
import { ICountry, ICountryCode } from '../../../types/types';

const { mainColor, white, ligthBlue, blueSelected } = customStyles;
interface Props {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  options: ICountryCode[];
}

const PhoneAreaModal = ({ selectedOption, setSelectedOption, options }: Props) => {
  const { toggle, setToggle, value } = useToggle(false);
  const [text, onChangeText] = useState('');
  const countryInfo = options.find((item: any) => item.isoCode === selectedOption);

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
      <Modal
        scrollOffset={100}
        isVisible={value}
        useNativeDriverForBackdrop={true}
        onBackdropPress={() => setToggle(false)}
        onSwipeComplete={() => setToggle(false)}
        onBackButtonPress={() => setToggle(false)}
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
          <SearchBar
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
            renderItem={({ item }) => (
              <OptionCountrySelect
                // galleryMode
                withPrefix
                key={item.id}
                name={item.name}
                flag={item.isoCode}
                prefix={item.prefix}
                backgroundColor={selectedOption === item.isoCode ? ligthBlue : white}
                textColor={selectedOption === item.isoCode ? mainColor : blueSelected}
                borderWith={selectedOption === item.isoCode ? 0 : 1}
                onPress={() => handleModal(item.isoCode)}
              />
            )}
          />
        </View>
      </Modal>
      <PrefixInput value={countryInfo} marginBottom={25} onPress={() => setToggle(true)} />
    </View>
  );
};

export default PhoneAreaModal;
