import { View, Text } from 'react-native';
import React from 'react';
import customStyles from '../../styles/customStyles';
import Icon from './Icon';
import Search from 'react-native-vector-icons/Feather';
import Arrow from 'react-native-vector-icons/Ionicons';
import Dropdown from './Dropdown';

const { background, white, textBlack } = customStyles;

interface SimpleProps {
  label: string;
  onPressSearch?: () => void;
  onPressDelete?: () => void;
  withSearch?: boolean;
  withDelete?: boolean;
  withOptions?: boolean;
}
interface Props extends SimpleProps {
  onPressBack: () => void;
  hasType?: boolean;
  color?: string;
  headerStyle?: {};
  options?: any[];
}

export const HeaderTitle = ({ label, withSearch, onPressSearch }: SimpleProps) => {
  return (
    <View
      style={{
        backgroundColor: background,
        height: 60,
        paddingLeft: 20,
        justifyContent: 'space-between',
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontFamily: 'Gilroy-Bold',
          color: textBlack,
        }}
      >
        {label}
      </Text>
      {withSearch && (
        <Icon onPress={onPressSearch}>
          <Search name='search' size={25} color={textBlack} />
        </Icon>
      )}
    </View>
  );
};

export const BackHeaderTitle = ({
  label,
  withSearch,
  withDelete,
  withOptions,
  onPressSearch,
  onPressDelete,
  onPressBack,
  hasType,
  color,
  headerStyle,
  options = [],
}: Props) => {
  return (
    <View
      style={[
        {
          backgroundColor: hasType ? color : background,
          height: 60,
          paddingLeft: 10,
          justifyContent: 'space-between',
          paddingRight: 10,
          flexDirection: 'row',
          alignItems: 'center',
        },
        headerStyle,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon onPress={onPressBack}>
          <Arrow name='chevron-back' size={30} color={hasType ? white : textBlack} />
        </Icon>
        <Text
          style={{
            fontSize: 22,
            fontFamily: 'Gilroy-Bold',
            color: hasType ? white : textBlack,
            paddingLeft: 10,
          }}
        >
          {label}
        </Text>
      </View>
      {withSearch && (
        <Icon onPress={onPressSearch}>
          <Search name='search' size={25} color={hasType ? white : textBlack} />
        </Icon>
      )}
      {withDelete && (
        <Icon onPress={onPressDelete}>
          <Search name='trash-2' size={25} color={hasType ? white : textBlack} />
        </Icon>
      )}
      {/* {withOptions && <Dropdown options={options} />} */}
    </View>
  );
};
