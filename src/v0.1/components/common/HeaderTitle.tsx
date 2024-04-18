import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import customStyles from '../../styles/customStyles';
import Icon from './Icon';
import Search from 'react-native-vector-icons/Feather';
import Arrow from 'react-native-vector-icons/Ionicons';
import ButtonIcon from '../Library/ButtonIcon';

const { background, white, textBlack, marginHorizontal, iconColor } = customStyles;

interface SimpleProps {
  label: string;
  onPressSearch?: () => void;
  withSearch?: boolean;
}
interface Props extends SimpleProps {
  onPressBack: () => void;
  hasType?: boolean;
  color?: string;
  headerStyle?: {};
  withDelete?: boolean;
  onPressDelete?: () => void;
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: background,
    height: 60,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: marginHorizontal,
  },
  text: {
    fontSize: 22,
    fontFamily: 'Gilroy-Bold',
    color: textBlack,
  },
});

export const Header = ({ label, withSearch, onPressSearch }: SimpleProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{label}</Text>
      {withSearch && (
        <ButtonIcon onPress={onPressSearch}>
          <Search name='search' size={30} color={iconColor} />
        </ButtonIcon>
      )}
    </View>
  );
};

export const BackHeaderTitle = ({
  label,
  withSearch,
  withDelete,
  onPressSearch,
  onPressDelete,
  onPressBack,
  hasType,
  color,
  headerStyle,
}: Props) => {
  return (
    <View
      style={[
        {
          backgroundColor: hasType ? color : background,
          height: 60,
          paddingLeft: 10,
          justifyContent: 'space-between',
          paddingRight: 25,
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
    </View>
  );
};
