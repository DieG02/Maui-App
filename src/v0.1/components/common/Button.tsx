import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import customStyles from '../../styles/customStyles';

type props = React.FC<Props & React.ComponentProps<typeof TouchableOpacity>>;
interface Props {
  text: string;
  disabled?: boolean;
  color?: string;
  icon?: React.ReactNode;
}

const Button: props = ({ color, style, text, disabled, icon, ...otherProps }) => {
  const { white, width } = customStyles;

  const styles = StyleSheet.create({
    root: {
      borderRadius: 30,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.7 : 1,
    },
    text: {
      color: color ? color : white,
      fontSize: width / 24,
      textAlign: 'center',
      fontFamily: 'Gilroy-SemiBold',
    },
  });
  return (
    <TouchableOpacity style={[styles.root, style]} disabled={disabled} {...otherProps}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 25,
        }}
      >
        {icon ? <View>{icon}</View> : null}
        <View style={{ flex: 1 }}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
