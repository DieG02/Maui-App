import { View, TextInput, Text } from 'react-native';
import React from 'react';
import customStyles from '../../styles/customStyles';
import PhoneAreaModal from '../../components/common/Modals/PhoneAreaModal';
import { countries } from '../../helpers/countries';

const { secondaryColorBorder, textBlack, expense } = customStyles;

interface Props {
  value: string;
  setValue: (value: string) => void;
  name: string;
  placeholder: string;
  marginBottom?: number;
  marginTop?: number;
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  notRequired?: boolean;
}

const PhoneInput = ({
  value,
  setValue,
  name,
  placeholder,
  marginBottom,
  marginTop,
  isModalVisible,
  setIsModalVisible,
  selectedOption,
  setSelectedOption,
  notRequired,
}: Props) => {
  const options: Array<CountryItem> = countries;

  return (
    <View
      style={{
        marginBottom: marginBottom,
        marginTop: marginTop,
      }}
    >
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
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          justifyContent: 'space-between',
          height: 55,
        }}
      >
        <View
          style={{
            width: '30%',
          }}
        >
          <PhoneAreaModal
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          />
        </View>
        <View
          style={{
            borderRadius: 12,
            borderColor: secondaryColorBorder,
            borderWidth: 1,
            width: '65%',
          }}
        >
          <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            keyboardType='phone-pad'
            style={{
              paddingHorizontal: 20,
              color: textBlack,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default PhoneInput;
