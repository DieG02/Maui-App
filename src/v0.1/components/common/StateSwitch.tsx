import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import customStyles from '../../styles/customStyles';
import i18n from '../../services/i18n-config';
import useToggle from '../../hooks/useToggle';

const { mainColor, textBlack, white, secondaryColorBorder } = customStyles;

type SwitchTypes = {
  title: string;
  isPressed: boolean;
  handleSwitch: () => void;
};

type ToggleTypes = {
  value: boolean;
  handleValue: () => void;
  text: string;
  backgroundColor: string;
  textColor: string;
};

const StateSwitch = ({ title, isPressed, handleSwitch }: SwitchTypes) => {
  const { toggle, value: isToggle } = useToggle(isPressed);
  const { t } = i18n;

  const handleToggle = () => {
    handleSwitch();
    toggle();
  };

  const ToggleButton = ({ value, handleValue, text, backgroundColor, textColor }: ToggleTypes) => {
    return (
      <TouchableOpacity
        disabled={value}
        onPress={handleValue}
        style={{
          backgroundColor: backgroundColor,
          height: '100%',
          borderRadius: 15,
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: 'bold', color: textColor }}>{text}</Text>
      </TouchableOpacity>
    );
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
        {title}
      </Text>
      <View
        style={{
          elevation: 0,
          borderRadius: 15,
          borderColor: secondaryColorBorder,
          margin: 0,
          marginBottom: 15,
          marginTop: 5,
          borderWidth: 1,
          height: 50,
          flexWrap: 'nowrap',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ToggleButton
          value={isToggle}
          handleValue={handleToggle}
          backgroundColor={isToggle ? mainColor : white}
          textColor={isToggle ? white : mainColor}
          text={t('balance_stack.state_options.paid')}
        />
        <ToggleButton
          value={!isToggle}
          handleValue={handleToggle}
          backgroundColor={isToggle ? white : mainColor}
          textColor={isToggle ? mainColor : white}
          text={t('balance_stack.state_options.debt')}
        />
      </View>
    </View>
  );
};

export default StateSwitch;
