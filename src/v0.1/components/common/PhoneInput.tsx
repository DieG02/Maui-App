import { View, TextInput } from 'react-native'
import React from 'react'
import customStyles from '../../styles/customStyles';
import PhoneAreaModal from "../../components/common/Modals/PhoneAreaModal";
import { countries } from '../../helpers/countries';

const {secondaryColorBorder, textBlack} = customStyles;

interface Props {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  marginBottom?: number;
  marginTop?: number;
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}

const PhoneInput = ({
  value,
  setValue,
  placeholder,
  marginBottom,
  marginTop,
  isModalVisible,
  setIsModalVisible,
  selectedOption,
  setSelectedOption
}:Props) => {
  
  const options:Array<CountryItem> = countries

  return (
    <View
      style={{
        display:'flex',
        flexDirection:'row',
        flexWrap:'nowrap',
        justifyContent:'space-between', 
        height:55,
        marginBottom: marginBottom,
        marginTop: marginTop,
      }}>
        <View
          style={{
            width:'30%',
          }}>
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
            width:'70%',
          }}>
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
  )
}

export default PhoneInput