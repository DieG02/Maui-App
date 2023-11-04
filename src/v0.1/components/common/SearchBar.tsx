import { View, TextInput } from 'react-native';
import Icon from '../../components/common/Icon';
import Close from 'react-native-vector-icons/AntDesign';

import React from 'react';
import customStyles from '../../styles/customStyles';

const { width, textBlack, textLight } = customStyles;

interface Props {
  onChangeText: (text: string) => void;
  text: string;
  placeholder: string;
  onPress: () => void;
  onBlur?: () => void;
}

const SearchBar = ({ onChangeText, text, placeholder, onPress, onBlur }: Props) => {
  return (
    <View
      style={{
        height: 60,
        backgroundColor: 'white',
        borderColor: '#e0e0e0',
        borderBottomWidth: 1,
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <TextInput
        onChangeText={onChangeText}
        value={text}
        autoFocus={true}
        placeholder={placeholder}
        onBlur={onBlur}
        placeholderTextColor={textLight}
        style={{
          marginLeft: 20,
          width: width - 80,
          fontSize: 18,
          color: textBlack,
          fontFamily: 'Gilroy-Medium',
        }}
        autoCapitalize='none'
      />
      <Icon onPress={onPress}>
        <Close name='close' size={25} color={textBlack} />
      </Icon>
    </View>
  );
};

export default SearchBar;
