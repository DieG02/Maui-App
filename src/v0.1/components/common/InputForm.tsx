import React from 'react';
import { Text, TextInput, View } from 'react-native';
import customStyles from '../../styles/customStyles';
import { round, separator } from '../../utils/math';

interface Props {
  bottom?: number;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  name: string;
  marginBottom?: number;
  marginTop?: number;
  autoFocus?: boolean;
  onSubmit?: () => void;
  required?: boolean;
  onBlur?: () => void;
  hasButton?: boolean;
  buttonComponent?: React.ReactNode;
}

const { textBlack, expense, secondaryColorBorder, textLight } = customStyles;

const InputForm = ({
  keyboardType,
  placeholder,
  value,
  setValue,
  name,
  marginBottom,
  marginTop,
  autoFocus,
  onSubmit,
  required,
  hasButton = false,
  buttonComponent,
}: Props) => {
  return (
    <View style={{ marginBottom, marginTop }}>
      <Text
        style={{
          fontSize: 18,
          color: textBlack,
          fontFamily: 'Gilroy-Bold',
          marginBottom: 10,
        }}
      >
        {name} {required && <Text style={{ color: expense }}>*</Text>}
      </Text>
      <View
        style={{
          height: 55,
          borderRadius: 12,
          borderColor: secondaryColorBorder,
          borderWidth: 1,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <TextInput
          style={{
            height: 50,
            width: hasButton ? '60%' : '100%',
            fontSize: 20,
            marginLeft: 20,
            color: textBlack,
            fontFamily: 'Gilroy-Medium',
            marginTop: 3,
          }}
          value={value}
          onChangeText={text => {
            text = text.replace(/[^0-9,]/g, '');
            const [integer, decimal] = text.split(',');
            const formated = separator(integer) + (decimal !== undefined ? ',' + decimal : '');
            if (formated.length <= 20) setValue(formated);
          }}
          onBlur={() => {
            if (parseFloat(value.replace(/\./g, '').replace(',', '.')) !== 0) {
              setValue(round(value));
            } else {
              setValue('');
            }
          }}
          placeholder={placeholder}
          placeholderTextColor={textLight}
          keyboardType={keyboardType}
          maxLength={20}
          autoFocus={autoFocus}
          onSubmitEditing={onSubmit}
        />
        {hasButton && buttonComponent}
      </View>
    </View>
  );
};

export default InputForm;
