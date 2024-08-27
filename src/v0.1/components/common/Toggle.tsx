import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Pressable } from 'react-native';
import customStyles from '../../styles/customStyles';

const { mainColor, white, textBlack, disabled } = customStyles;

interface ToggleProps {
  label?: string;
  value: boolean;
  onValueChange: (e: boolean) => void;
}

const Toggle = ({ label, value, onValueChange }: ToggleProps) => {
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 300, // Adjust duration for smoothness
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 20], // Adjust range to match the size of the toggle
  });

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      {label && (
        <Text
          style={{
            fontSize: 18,
            color: textBlack,
            fontFamily: 'Gilroy-Bold',
            marginBottom: 10,
          }}
        >
          {label}
        </Text>
      )}
      <Pressable
        onPress={() => onValueChange(!value)}
        style={{
          position: 'relative',
          backgroundColor: value ? mainColor : disabled,
          borderRadius: 50,
          width: 45,
          paddingHorizontal: 2,
          justifyContent: 'center',
          height: 25,
        }}
      >
        <Animated.View
          style={{
            transform: [{ translateX }],
            borderRadius: 50,
            width: 20,
            height: 20,
            backgroundColor: white,
          }}
        />
      </Pressable>
    </View>
  );
};

export default Toggle;
