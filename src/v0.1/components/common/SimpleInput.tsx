import { View, Text, TextInput } from 'react-native';
import React from 'react';
import customStyles from '../../styles/customStyles';

const { expense, textBlack } = customStyles;

interface Props extends React.ComponentProps<typeof TextInput> {
  value: string;
  name?: string;
  setValue: (value: string) => void;
  placeholder?: string;
  marginBottom?: number;
  marginTop?: number;
  required?: boolean;
}

const SimpleInput = ({
  name,
  value,
  setValue,
  placeholder,
  marginBottom,
  marginTop,
  multiline,
  required,
  ...otherProps
}: Props) => {
  return (
    <View style={{ marginBottom: marginBottom, marginTop: marginTop }}>
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
          height: multiline ? 'auto' : 55,
          borderRadius: 12,
          borderColor: '#EAEAEA',
          borderWidth: 1,
          justifyContent: 'center',
        }}
      >
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          placeholderTextColor='#ACACAC'
          style={{
            marginHorizontal: 20,
            color: textBlack,
          }}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          {...otherProps}
        />
      </View>
    </View>
  );
};

export default SimpleInput;
