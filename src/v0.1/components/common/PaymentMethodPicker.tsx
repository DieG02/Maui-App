import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import customStyles from '../../styles/customStyles';
import i18n from '../../services/i18n-config';

const { textBlack, secondaryColorBorder, mainColor } = customStyles;

type Props = {
  name: string;
  options: Array<any>;
  value: string;
  handleValue: (value: string) => void;
};

type OptionButtonProps = {
  optionValue: string;
  paymentIcon: React.ComponentType<any>;
  iconName: string;
  text: string;
  borderColor: string;
  borderWidth: number;
};

const PaymentMethodPicker = ({ name, options, value, handleValue }: Props) => {
  const [selectedId, setSelectedId] = useState<string>(value);
  const { t } = i18n;

  const handleState = (value: string) => {
    if (selectedId !== value) {
      setSelectedId(value);
      handleValue(value);
    }
  };

  const OptionButton = ({
    optionValue,
    text,
    paymentIcon: PaymentIcon,
    iconName,
    borderColor,
    borderWidth,
  }: OptionButtonProps) => {
    return (
      <TouchableOpacity
        disabled={selectedId === optionValue}
        onPress={() => handleState(optionValue)}
        style={{
          elevation: 0,
          borderRadius: 15,
          borderColor: borderColor,
          margin: 5,
          borderWidth,
          alignItems: 'center',
          justifyContent: 'center',
          height: 80,
          width: '30%',
        }}
      >
        <PaymentIcon name={iconName} size={25} color={selectedId === optionValue ? mainColor : textBlack} />
        <Text
          style={{
            textAlign: 'center',
            paddingTop: 4,
            color: textBlack,
            fontFamily: 'Gilroy-SemiBold',
          }}
        >
          {t(text)}
        </Text>
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
        {name}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
        }}
      >
        {options.map(item => (
          <OptionButton
            key={item.value}
            optionValue={item.value}
            iconName={item.iconName}
            paymentIcon={item.icon}
            text={item.label}
            borderColor={selectedId === item.value ? mainColor : secondaryColorBorder}
            borderWidth={selectedId === item.value ? 2 : 1}
          />
        ))}
      </View>
    </View>
  );
};

export default PaymentMethodPicker;
